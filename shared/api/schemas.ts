import { z } from "zod";

// Central place for runtime validation so route handlers and clients stay aligned.
// Schemas are designed to be as strict as possible to catch errors early and ensure data integrity.
export const bookingStatusSchema = z.enum([
  "confirmed",
  "pending",
  "waitlist",
  "cancelled",
]);

export const reservationSchema = z.object({
  id: z.string(),
  restaurant_id: z.string(),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().nullable(),
  reservation_date: z.string().min(1),
  reservation_time: z.string().min(1),
  partysize: z.number().int().positive(),
  status: bookingStatusSchema,
  note: z.string().nullable(),
  created_at: z.string(),
  restaurant_name: z.string().min(1),
});

export const createReservationSchema = z.object({
  name: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  email: z.string().trim().email(),
  reservation_date: z.string().min(1),
  reservation_time: z.string().min(1),
  partysize: z.number().int().positive(),
  note: z.string(),
});

export const updateReservationSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    phone: z.string().trim().min(1).optional(),
    email: z.string().trim().email().nullable().optional(),
    reservation_date: z.string().min(1).optional(),
    reservation_time: z.string().min(1).optional(),
    partysize: z.number().int().positive().optional(),
    status: bookingStatusSchema.optional(),
    note: z.string().nullable().optional(),
    restaurant_name: z.string().min(1).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export const duplicateCheckSchema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
  name: z.string().trim().min(1),
});

export const availabilitySchema = z.object({
  date: z.string().min(1),
  time: z.string().min(1),
});

export const updateTemplateSchema = z.object({
  id: z.string().min(1),
  subject: z.string().trim().min(1),
  html: z.string().min(1),
});

export const crudTableSchema = z.enum([
  "reservations",
  "bookings",
  "users",
  "email_templates",
]);

export const crudGetQuerySchema = z.object({
  table: crudTableSchema,
});

// CRUD schemas are split by table so each route can validate the right payload shape.
export const crudCreateSchema = z.discriminatedUnion("table", [
  z.object({
    table: z.literal("reservations"),
    data: createReservationSchema,
  }),
  z.object({
    table: z.literal("email_templates"),
    data: updateTemplateSchema.omit({ id: true }),
  }),
  z.object({
    table: z.literal("bookings"),
    data: z.record(z.string(), z.unknown()),
  }),
  z.object({
    table: z.literal("users"),
    data: z.record(z.string(), z.unknown()),
  }),
]);

export const crudEditSchema = z.discriminatedUnion("table", [
  z.object({
    table: z.literal("reservations"),
    id: z.string().min(1),
    data: updateReservationSchema,
  }),
  z.object({
    table: z.literal("email_templates"),
    id: z.string().min(1),
    data: updateTemplateSchema.omit({ id: true }),
  }),
  z.object({
    table: z.literal("bookings"),
    id: z.string().min(1),
    data: z.record(z.string(), z.unknown()),
  }),
  z.object({
    table: z.literal("users"),
    id: z.string().min(1),
    data: z.record(z.string(), z.unknown()),
  }),
]);

export const crudDeleteSchema = z.object({
  table: crudTableSchema,
  id: z.string().min(1),
});
