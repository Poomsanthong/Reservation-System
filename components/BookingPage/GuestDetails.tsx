import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const GuestDetails = ({ form }: { form: any }) => {
  return (
    <div>
      {/* Guest Details */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={form.fields.name}
            onChange={(e) => form.updateField("name", e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.fields.email}
            onChange={(e) => form.updateField("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={form.fields.phone}
            onChange={(e) => form.updateField("phone", e.target.value)}
            placeholder="+1 555 000 0000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Special Requests</Label>
          <Input
            id="note"
            placeholder="Window seat, birthday..."
            value={form.fields.note}
            onChange={(e) => form.updateField("note", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;
