import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const StatsCard = ({ statsData }: { statsData: statsDataType[] }) => {
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
