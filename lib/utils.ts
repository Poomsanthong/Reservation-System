import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Standardized success and failure responses

export function success(data: any) {
  return NextResponse.json({ success: true, data });
}

export function fail(error: any) {
  return NextResponse.json(
    { success: false, error: error.message || "Unknown error" },
    { status: 400 }
  );
}
// Allowed tables for CRUD operations
export const allowedTables = ["reservations", "bookings", "users"]; // extend as needed

export function validateTable(table?: string | null) {
  if (!table) throw new Error("Table name is required");
  if (!allowedTables.includes(table)) throw new Error("Invalid table");
}

export function requireFields(obj: any, fields: string[]) {
  for (const field of fields) {
    if (!obj[field]) {
      throw new Error(`Missing field: ${field}`);
    }
  }
}
