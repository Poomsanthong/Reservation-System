import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import type { ApiFailure, ApiSuccess } from "@/shared/api/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Standardized success and failure responses

export function success<T>(data: T) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, data });
}

export function fail(error: unknown, status = 400) {
  const message =
    error instanceof ZodError
      ? error.issues.map((issue) => issue.message).join(", ")
      : error instanceof Error
        ? error.message
        : "Unknown error";

  return NextResponse.json(
    { success: false, error: message } satisfies ApiFailure,
    { status },
  );
}
// Allowed tables for CRUD operations
export const allowedTables = [
  "reservations",
  "bookings",
  "users",
  "email_templates",
];
export function validateTable(table?: string | null) {
  if (!table) throw new Error("Table name is required");
  if (!allowedTables.includes(table)) throw new Error("Invalid table");
}

export function requireFields<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[],
) {
  for (const field of fields) {
    if (obj[field] === undefined || obj[field] === null) {
      throw new Error(`Missing field: ${String(field)}`);
    }
  }
}
