"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Book,
} from "lucide-react";

import { BookingsTable } from "@/components/AdminDashbaordPage/BookingTab/bookingTable";
import { ScheduleManager } from "@/components/AdminDashbaordPage/ScheduleTab/scheduleManager";
import StatsCard from "@/components/AdminDashbaordPage/OverViewTab/StatsCard";
import BookTrendChart from "./OverViewTab/BookTrendChart";
import RevenueChart from "./OverViewTab/RevenueChart";
import TimeConstribution from "./OverViewTab/TimeConstribution";
import RecentActivity from "./OverViewTab/RecentActivity";
import Comunication from "./CommunicationTab/Comunication";
import MessageTemplate from "./CommunicationTab/MessageTemplate";
import CommunicationHistory from "./CommunicationTab/CommunicationHistory";

// const recentActivity = [
//   {
//     type: "booking",
//     guest: "Emily Chen",
//     action: "New booking for 4 guests",
//     time: "2 min ago",
//     status: "confirmed",
//   },
// ];

export default function AdminDashboard({
  userEmail,
  totalBookings,
  totalGuests,
  previousTotalBookings,
  previousTotalGuests,
  bookings,
  bookingTrends,
  timeDistribution,
  recentActivity,
}: {
  userEmail: string | null;
  totalBookings: number;
  totalGuests: number;
  previousTotalBookings: number;
  previousTotalGuests: number;
  bookings: Reservation[];
  bookingTrends: { month: string; bookings: number }[];
  timeDistribution: { time: string; value: number; color: string }[];
  recentActivity: {
    type: string;
    guest: string;
    action: string;
    time: string;
    status: string;
  }[];
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0">
        <div className="mb-8 min-w-0">
          <h2 className="text-slate-900 mb-2">
            Welcome, <span className="text-3xl break-words">{userEmail}</span>
          </h2>
          <p className="text-slate-600">
            Manage reservations and track performance
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="min-w-0"
        >
          <TabsList className="mb-6 flex flex-wrap min-w-0">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Clock className="w-4 h-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="communications">
              <MessageSquare className="w-4 h-4 mr-2" />
              Communications
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 min-w-0">
            <StatsCard
              totalBookings={totalBookings}
              totalGuests={totalGuests}
              previousTotalBookings={previousTotalBookings}
              previousTotalGuests={previousTotalGuests}
            />

            <div className="h-6" />

            <div className="grid lg:grid-cols-2 gap-6 min-w-0">
              <div className="min-w-0 overflow-x-auto">
                <BookTrendChart bookingTrends={bookingTrends} />
              </div>

              {/* <div className="min-w-0 overflow-x-auto">
                <RevenueChart bookingTrends={bookingTrends} />
              </div> */}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 min-w-0">
              <TimeConstribution timeDistribution={timeDistribution} />
              <RecentActivity recentActivity={recentActivity} />
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="min-w-0">
            <div className="overflow-x-auto">
              <BookingsTable bookings={bookings} />
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="min-w-0">
            <ScheduleManager />
          </TabsContent>

          {/* Communications Tab */}
          <TabsContent value="communications" className="space-y-6 min-w-0">
            <div className="grid lg:grid-cols-2 gap-6 min-w-0">
              <Comunication />
              <MessageTemplate />
            </div>

            <CommunicationHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
