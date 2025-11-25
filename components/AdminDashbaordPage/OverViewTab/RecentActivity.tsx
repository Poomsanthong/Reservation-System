import React from "react";
import { Badge } from "../../ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";

const RecentActivity = ({
  recentActivity,
}: {
  recentActivity: {
    type: string;
    guest: string;
    action: string;
    time: string;
    status: string;
  }[];
}) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest booking updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {activity.guest
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-slate-900">{activity.guest}</p>
                    <p className="text-sm text-slate-600">{activity.action}</p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "confirmed"
                        ? "default"
                        : activity.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {activity.status === "confirmed" && (
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                    )}
                    {activity.status === "cancelled" && (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {activity.status === "waitlist" && (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
