// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";
import { randomUUID } from "crypto";

// Utility function to create URL-friendly slugs from organization names
function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function POST(req: NextRequest) {
  let createdUserId: string | null = null;

  try {
    let email = "";
    let password = "";
    let organization = "";
    let logoUrl: string | null = null;
    let logoFile: File | null = null;

    // Detect if request is multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      email = (form.get("email") as string)?.trim();
      password = form.get("password") as string;
      organization = (form.get("organization") as string)?.trim();
      const logo = form.get("logo");
      if (logo && typeof logo === "object" && "arrayBuffer" in logo) {
        logoFile = logo as File;
      }
    } else {
      const body = await req.json();
      email = body?.email?.trim();
      password = body?.password;
      organization = body?.organization?.trim();
    }

    if (!email || !password || !organization) {
      return NextResponse.json(
        { error: "Email, password, and organization are required." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 },
      );
    }

    // Generate a unique slug for the restaurant based on the organization name
    const baseSlug = slugify(organization);
    if (!baseSlug) {
      return NextResponse.json(
        { error: "Organization name is invalid." },
        { status: 400 },
      );
    }

    console.log("Creating slug for organization:", baseSlug);
    // Check if the slug already exists and append a number if it does
    const supabase = supabaseAdmin;

    // Upload logo if present
    if (logoFile) {
      const ext = logoFile.name.split(".").pop() || "png";
      const fileName = `${baseSlug}-${randomUUID()}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("logos")
        .upload(fileName, Buffer.from(await logoFile.arrayBuffer()), {
          contentType: logoFile.type,
          upsert: true,
        });
      if (uploadError) {
        console.error("Logo upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload logo." },
          { status: 500 },
        );
      }
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("logos")
        .getPublicUrl(fileName);
      logoUrl = publicUrlData?.publicUrl || null;
    }

    const { data: userData, error: signUpError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    // Log the result of the user creation attempt for debugging
    console.log("SIGNUP ERROR:", signUpError);
    console.log("USER DATA:", userData);

    if (signUpError || !userData?.user) {
      return NextResponse.json(
        { error: signUpError?.message ?? "Failed to create user." },
        { status: 400 },
      );
    }

    createdUserId = userData.user.id;
    let slug = baseSlug;
    let counter = 1;

    // Loop to ensure the slug is unique by checking the database and appending a counter if necessary
    while (true) {
      const { data: existingRestaurant, error: slugCheckError } = await supabase
        .from("restaurants")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (slugCheckError) {
        console.error("Failed while checking restaurant slug:", slugCheckError);
        return NextResponse.json(
          {
            error: `Could not verify restaurant slug: ${slugCheckError.message}`,
          },
          { status: 500 },
        );
      }

      if (!existingRestaurant) {
        break;
      }

      counter += 1;
      slug = `${baseSlug}-${counter}`;
    }

    // Insert new restaurant
    const { error: restaurantError, data: restaurantData } = await supabase
      .from("restaurants")
      .insert([
        {
          name: organization,
          slug,
          owner_id: createdUserId,
          logo_url: logoUrl,
        },
      ])
      .select();

    if (restaurantError) {
      await supabase.auth.admin.deleteUser(createdUserId);
      return NextResponse.json(
        { error: restaurantError.message },
        { status: 400 },
      );
    }

    // Insert default email templates for the new restaurant
    // Reminder template
    const reminderSubject = "Reservation Reminder";
    const reminderHtml = `<h2 style="color:#111827;">Hi {{name}},</h2>

<p>This is a friendly reminder that your reservation is coming up soon.</p>

<div style="background:#f9fafb; padding:16px; border-radius:8px; margin:16px 0;">
  <p style="margin:4px 0;"><strong>Date:</strong> {{reservation_date}}</p>
  <p style="margin:4px 0;"><strong>Time:</strong> {{reservation_time}}</p>
  <p style="margin:4px 0;"><strong>Party Size:</strong> {{partysize}}</p>
</div>

<p><strong>Booking ID:</strong> {{booking_id}}</p>

<p>Please arrive on time. We look forward to welcoming you.</p>

<p style="color:#6b7280; font-size:12px; margin-top:24px;">
  Need to make changes? Contact us or manage your reservation online.
</p>`;

    // Confirmation template
    const confirmationSubject = "Reservation Confirmation";
    const confirmationHtml = `<h2 style="color:#111827;">Hello {{name}},</h2>

<p>Thank you for your reservation. Your booking is confirmed.</p>

<div style="background:#f9fafb; padding:16px; border-radius:8px; margin:16px 0;">
  <p style="margin:4px 0;"><strong>Date:</strong> {{reservation_date}}</p>
  <p style="margin:4px 0;"><strong>Time:</strong> {{reservation_time}}</p>
  <p style="margin:4px 0;"><strong>Party Size:</strong> {{partysize}}</p>
</div>

<p><strong>Booking ID:</strong> {{booking_id}}</p>

<p>We look forward to welcoming you.</p>

<div style="margin:24px 0;">
  <a href="{{manage_url}}" 
     style="background:#111827; color:#ffffff; padding:10px 16px; text-decoration:none; border-radius:6px; font-size:14px;">
     Manage Reservation
  </a>
</div>

<p style="color:#6b7280; font-size:12px;">
  Need to make changes? Use the button above or contact us directly.
</p>`;

    // Get the new restaurant's id
    const restaurantId = restaurantData?.[0]?.id;
    if (restaurantId) {
      console.log(
        "Inserting default templates for restaurantId:",
        restaurantId,
      );
      const { error: templateError, data: templateData } = await supabase
        .from("email_templates")
        .insert([
          {
            restaurant_id: restaurantId,
            subject: reminderSubject,
            html: reminderHtml,
            type: "reminder",
          },
          {
            restaurant_id: restaurantId,
            subject: confirmationSubject,
            html: confirmationHtml,
            type: "confirmation",
          },
        ])
        .select();
      if (templateError) {
        console.error("Failed to insert default templates:", templateError);
      } else {
        console.log("Inserted default templates:", templateData);
      }
    }

    // Respond with success
    return NextResponse.json(
      { success: true, userId: createdUserId, slug },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Unexpected signup error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";

    if (createdUserId) {
      try {
        const supabase = supabaseAdmin;
        await supabase.auth.admin.deleteUser(createdUserId);
      } catch {
        // ignore cleanup failure
      }
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
