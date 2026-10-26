import {
  addBlackoutDate,
  getBlackoutDates,
  unblockDate,
} from "@/features/restaurants/server/getBlockDates";
import { fail, success } from "@/lib/utils";
import {
  blackoutDateSchema,
  unblockDateSchema,
} from "@/shared/api/schemas";

export async function GET() {
  try {
    return success(await getBlackoutDates());
  } catch (error) {
    console.error("Error loading blackout dates:", error);
    return fail(error, 500);
  }
}

export async function POST(req: Request) {
  try {
    const { date, reason } = blackoutDateSchema.parse(await req.json());
    return success(await addBlackoutDate(date, reason));
  } catch (error) {
    console.error("Error adding blackout date:", error);
    return fail(error, 500);
  }
}

export async function DELETE(req: Request) {
  try {
    const { date } = unblockDateSchema.parse(await req.json());
    return success(await unblockDate(date));
  } catch (error) {
    console.error("Error removing blackout date:", error);
    return fail(error, 500);
  }
}
