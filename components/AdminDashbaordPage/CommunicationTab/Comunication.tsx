"use client";
import React, { use, useEffect, useState } from "react";
import { Badge } from "../../ui/badge";
import { Mail, MessageSquare, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { getMessageStats } from "../../../lib/api/functions";
const Comunication = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Fetch message stats from the API
    async function fetchStats() {
      try {
        const stats = await getMessageStats();
        console.log("Message Stats:", stats);
        setStats(stats);
      } catch (error) {
        console.error("Error fetching message stats:", error);
      }
    }
    fetchStats();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Stats</CardTitle>
        <CardDescription>Automated messaging performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Confirmations Sent</p>
              <p className="text-xl text-primary-900">
                {stats ? stats.confirmations.total : "Loading..."}
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">
            {stats
              ? `${stats.confirmations.deliveredPercentage || 0}% delivered`
              : "Loading..."}
          </Badge>
        </div>
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Reminders Sent</p>
              <p className="text-xl text-primary-900">
                {stats ? stats.reminders.total : "Loading..."}
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">
            {stats
              ? `${stats.reminders.openedPercentage || 0}% opened`
              : "Loading..."}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default Comunication;
