import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ArrowDownRight, ArrowUpRight, Calendar, Users } from "lucide-react";
import { calculateChange } from "@/lib/hooks/useDashboard";

const StatsCard = ({
  totalBookings,
  totalGuests,
}: {
  totalBookings: number | null;
  totalGuests: number | null;
}) => {
  const statsData: statsDataType[] = [
    {
      icon: Calendar,
      label: "Total Bookings",
      value: totalBookings !== null ? totalBookings.toString() : "N/A",
      change: "+12.5%",
      trend: "up",
    },
    {
      icon: Users,
      label: "Total Guests",
      value: totalGuests !== null ? totalGuests.toString() : "N/A",
      change: "+8.2%",
      trend: "up",
    },
  ];

  const { change: bookingsChange, trend: bookingsTrend } = calculateChange(
    totalBookings ?? 0,
    100
  ); // Replace 100 with previous value
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, idx) => (
        <Card key={idx}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-slate-600" />
              <Badge
                variant="secondary"
                className={
                  stat.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </Badge>
            </div>
            <div className="text-2xl text-slate-900 mb-1">{stat.value}</div>
            <p className="text-sm text-slate-600">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;
