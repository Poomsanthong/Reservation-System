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

const CommunicationHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Communications</CardTitle>
        <CardDescription>
          Automated messages sent by the AI assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            {
              type: "Confirmation",
              recipient: "emily.chen@email.com",
              status: "Delivered",
              time: "5 min ago",
            },
            {
              type: "Reminder",
              recipient: "michael.b@email.com",
              status: "Opened",
              time: "12 min ago",
            },
            {
              type: "Waitlist",
              recipient: "sarah.w@email.com",
              status: "Delivered",
              time: "28 min ago",
            },
            {
              type: "Thank You",
              recipient: "james.wilson@email.com",
              status: "Opened",
              time: "1 hr ago",
            },
            {
              type: "Confirmation",
              recipient: "lisa.anderson@email.com",
              status: "Delivered",
              time: "2 hrs ago",
            },
          ].map((comm, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-900">
                    {comm.type} → {comm.recipient}
                  </p>
                  <p className="text-xs text-slate-500">{comm.time}</p>
                </div>
              </div>
              <Badge
                variant={comm.status === "Opened" ? "default" : "secondary"}
              >
                {comm.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationHistory;
