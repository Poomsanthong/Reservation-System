"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getRecentMessages } from "@/lib/api/functions";
import { timeAgo } from "@/lib/dateHelper";

type Communication = {
  id: number;
  type: string;
  reminder_state: string;
  created_at: string;
  booking_id: {
    name: string;
    email: string;
  } | null;
};
const CommunicationHistory = ({ restaurant_id }: { restaurant_id: string }) => {
  const [communications, setCommunications] = useState<Communication[]>([]);

  useEffect(() => {
    async function fetchCommunications() {
      try {
        const data = await getRecentMessages(restaurant_id);

        setCommunications(data);
        console.log("Fetched communications:", data);
      } catch (error) {
        console.error("Error fetching communications:", error);
      }
    }

    fetchCommunications();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Communications</CardTitle>
        <CardDescription>Automated messages sent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {communications.map((comm) => (
            <div
              key={comm.id}
              className="flex items-center justify-between p-3 bg-primary-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-primary-900">
                    {comm.type} → {comm.booking_id?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-primary-500">
                    {timeAgo(comm.created_at)}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  comm.reminder_state === "delivered" ? "default" : "secondary"
                }
              >
                {comm.reminder_state}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationHistory;
