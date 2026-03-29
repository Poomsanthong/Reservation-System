// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

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
    const body = await req.json();
    console.log("Received sign-up request with body:", body);
    const email = body?.email?.trim();
    const password = body?.password;
    const organization = body?.organization?.trim();

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

    const baseSlug = slugify(organization);
    if (!baseSlug) {
      return NextResponse.json(
        { error: "Organization name is invalid." },
        { status: 400 },
      );
    }

    console.log("Creating slug for organization:", baseSlug);

    const supabase = supabaseAdmin;

    const { data: userData, error: signUpError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

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

    const { error: restaurantError } = await supabase
      .from("restaurants")
      .insert([
        {
          name: organization,
          slug,
          owner_id: createdUserId,
        },
      ]);

    if (restaurantError) {
      await supabase.auth.admin.deleteUser(createdUserId);

      return NextResponse.json(
        { error: restaurantError.message },
        { status: 400 },
      );
    }

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
