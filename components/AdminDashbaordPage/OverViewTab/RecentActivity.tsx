import React, { useState } from "react";
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

type Activity = {
  type: string;
  guest: string;
  action: string;
  time: string;
  status: string;
};

const statusBadge = (
  status: string
): {
  variant: "default" | "destructive" | "secondary";
  icon: React.ReactNode;
} => {
  switch (status) {
    case "confirmed":
      return {
        variant: "default",
        icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      };
    case "cancelled":
      return {
        variant: "destructive",
        icon: <XCircle className="w-3 h-3 mr-1" />,
      };
    case "waitlist":
      return {
        variant: "secondary",
        icon: <AlertCircle className="w-3 h-3 mr-1" />,
      };
    default:
      return { variant: "default", icon: null };
  }
};

const RecentActivity = ({ recentActivity }: { recentActivity: Activity[] }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedActivities = showAll
    ? recentActivity
    : recentActivity.slice(0, 5);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest booking updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedActivities.map((activity, idx) => {
          const { variant, icon } = statusBadge(activity.status);

          return (
            <div
              key={idx}
              className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
            >
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {activity.guest
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-slate-900">{activity.guest}</p>
                    <p className="text-sm text-slate-600">{activity.action}</p>
                  </div>
                  <Badge variant={variant}>
                    {icon}
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}

        {recentActivity.length > 5 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showAll ? "See Less" : `See All (${recentActivity.length})`}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
