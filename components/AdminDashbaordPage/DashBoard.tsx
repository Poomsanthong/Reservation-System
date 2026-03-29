"use client";
import { useEffect, useState } from "react";
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
import { Reservation } from "@/lib/types";

import { BookingsTable } from "@/components/AdminDashbaordPage/BookingTab/bookingTable";
import { ScheduleManager } from "@/components/AdminDashbaordPage/ScheduleTab/scheduleManager";
import StatsCard from "@/components/AdminDashbaordPage/OverViewTab/StatsCard";
import BookTrendChart from "./OverViewTab/BookTrendChart";
// import RevenueChart from "./OverViewTab/RevenueChart";
import TimeConstribution from "./OverViewTab/TimeConstribution";
import RecentActivity from "./OverViewTab/RecentActivity";

import Comunication from "./CommunicationTab/Comunication";
import MessageTemplate from "./CommunicationTab/MessageTemplate";
import CommunicationHistory from "./CommunicationTab/CommunicationHistory";

export default function AdminDashboard({
  userEmail,
  organizationName,
  totalBookings,
  totalGuests,
  previousTotalBookings,
  previousTotalGuests,
  bookings,
  bookingTrends,
  timeDistribution,
  recentActivity,
  restaurantId,
}: {
  userEmail: string | null;
  organizationName: string;
  totalBookings: number;
  totalGuests: number;
  previousTotalBookings: number;
  previousTotalGuests: number;
  bookings: Reservation[];
  bookingTrends: { month: string; bookings: number }[];
  timeDistribution: { time: string; value: number; color: string }[];
  restaurantId: string;
  recentActivity: {
    type: string;
    guest: string;
    action: string;
    time: string;
    status: string;
  }[];
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0">
          <div className="mb-8 min-w-0">
            <h2 className="text-primary-900 mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl break-words">
              Welcome,{" "}
              <span className="font-semibold ">{organizationName}</span>
            </h2>
            <p className="text-primary-600">
              Manage reservations and track performance
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0">
        <div className="mb-8 min-w-0">
          <h2 className="text-primary-900 mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl break-words">
            Welcome, <span className="font-semibold ">{organizationName}</span>
          </h2>
          <p className="text-primary-600">
            Manage reservations and track performance
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="min-w-0"
        >
          <TabsList
            className="
    mb-4
    flex w-full
    bg-muted/50
    p-1
    rounded-xl
    gap-1
    overflow-x-auto
    sm:overflow-visible
  "
          >
            <TabsTrigger
              value="overview"
              className=" flex items-center gap-2 rounded-lg px-3 py-2   text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>

            <TabsTrigger
              value="bookings"
              className=" flex items-center gap-2 rounded-lg px-3 py-2   text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>

            <TabsTrigger
              value="schedule"
              className=" flex items-center gap-2 rounded-lg px-3 py-2   text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>

            <TabsTrigger
              value="communications"
              className=" flex items-center gap-2 rounded-lg px-3 py-2   text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Communications</span>
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
            </div>

            <div className="grid lg:grid-cols-3 gap-6 min-w-0">
              <TimeConstribution timeDistribution={timeDistribution} />
              <RecentActivity recentActivity={recentActivity} />
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="min-w-0">
            <div className="overflow-x-auto">
              <BookingsTable bookings={bookings} restaurant={restaurantId} />
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
