import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Users } from "lucide-react";
import type { BookingFormController } from "@/features/bookings/types";

type PartysizeTabProps = {
  form: BookingFormController;
};

const PartysizeTab = ({ form }: PartysizeTabProps) => {
  return (
    <div>
      <>
        <CardHeader>
          <CardTitle>Select Date & Time</CardTitle>
          <CardDescription>Choose your reservation details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Party Size */}
          <div className="space-y-2">
            <Label>Party Size</Label>
            <Select
              value={form.fields.partysize}
              onValueChange={(value) =>
                form.updateField("partysize", value as `${number}`)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </>
    </div>
  );
};

export default PartysizeTab;
