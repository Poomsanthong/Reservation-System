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
// Mock data for dashboard stats and charts - to be replaced with real data later dynamically

const bookingTrends = [
  { month: "Jan", bookings: 245, revenue: 9800 },
  { month: "Feb", bookings: 312, revenue: 12500 },
  { month: "Mar", bookings: 279, revenue: 11300 },
  { month: "Apr", bookings: 340, revenue: 14200 },
  { month: "May", bookings: 390, revenue: 15800 },
  { month: "Jun", bookings: 450, revenue: 17500 },
  // add more data as needed i will impleted to be dynamic later
];

const timeDistribution = [
  { time: "Lunch (11-2)", value: 28, color: "#3b82f6" },
  { time: "Afternoon (2-5)", value: 22, color: "#10b981" },
  { time: "Dinner (5-9)", value: 35, color: "#f59e0b" },
  { time: "Late Night (9-12)", value: 15, color: "#ef4444" },

  // add more data as needed i will impleted to be dynamic later
];

const recentActivity = [
  {
    type: "booking",
    guest: "Emily Chen",
    action: "New booking for 4 guests",
    time: "2 min ago",
    status: "confirmed",
  },
  // add more data as needed i will impleted to be dynamic later
];

export default function AdminDashboard({
  totalBookings,
  totalGuests,
  previousTotalBookings,
  previousTotalGuests,
  bookings,
}: {
  totalBookings: number;
  totalGuests: number;
  previousTotalBookings: number;
  previousTotalGuests: number;
  bookings: Reservation[];
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-slate-900 mb-2"> Dashboard</h2>
        <p className="text-slate-600">
          Manage reservations and track performance
        </p>
      </div>
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
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
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <StatsCard
            totalBookings={totalBookings}
            totalGuests={totalGuests}
            previousTotalBookings={previousTotalBookings}
            previousTotalGuests={previousTotalGuests}
          />
          <div className="h-6" /> {/* Spacer  */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Booking Trends Chart */}
            <BookTrendChart bookingTrends={bookingTrends} />

            {/* Revenue Chart */}
            <RevenueChart bookingTrends={bookingTrends} />
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Time Distribution */}
            <TimeConstribution timeDistribution={timeDistribution} />

            {/* Recent Activity */}
            <RecentActivity recentActivity={recentActivity} />
          </div>
        </TabsContent>

        {/* Bookings Tab} */}
        <TabsContent value="bookings">
          <BookingsTable bookings={bookings} />
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <ScheduleManager />
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Communication Stats */}
            <Comunication />

            {/* Message Templates */}
            <MessageTemplate />
          </div>

          {/* Communication History */}
          <CommunicationHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
