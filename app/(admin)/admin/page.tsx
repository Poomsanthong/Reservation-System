"use client"; // This file runs in the browser (not on the server)
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
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BookingsTable } from "@/components/bookingTable";
import { ScheduleManager } from "@/components/scheduleManager";

// Mock data for dashboard stats and charts - to be replaced with real data later dynamically
const statsData = [
  {
    icon: Calendar,
    label: "Total Bookings",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
  },
  {
    icon: Users,
    label: "Total Guests",
    value: "8,432",
    change: "+8.2%",
    trend: "up",
  },
  {
    icon: DollarSign,
    label: "Revenue",
    value: "$142,580",
    change: "+15.3%",
    trend: "up",
  },
  {
    icon: Clock,
    label: "Avg Wait Time",
    value: "8 min",
    change: "-22%",
    trend: "down",
  },
];

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-slate-900 mb-2">Admin Dashboard</h2>
        <p className="text-slate-600">
          Manage reservations and track performance
        </p>
      </div>

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
                  <div className="text-2xl text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Booking Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
                <CardDescription>
                  Monthly bookings over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue in USD</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Time Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Time Distribution</CardTitle>
                <CardDescription>Bookings by time slot</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={timeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {timeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {timeDistribution.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-600">{item.time}</span>
                      </div>
                      <span className="text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
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
                            <p className="text-sm text-slate-900">
                              {activity.guest}
                            </p>
                            <p className="text-sm text-slate-600">
                              {activity.action}
                            </p>
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
                        <p className="text-xs text-slate-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bookings Tab} */}
        <TabsContent value="bookings">
          <BookingsTable />
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <ScheduleManager />
        </TabsContent>

        {/* Communications Tab */}
        <TabsContent value="communications" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Communication Stats */}
            <Card>
              <CardHeader>
                <CardTitle>AI Communication Stats</CardTitle>
                <CardDescription>
                  Automated messaging performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">
                        Confirmations Sent
                      </p>
                      <p className="text-xl text-slate-900">1,847</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    98.5% delivered
                  </Badge>
                </div>
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Reminders Sent</p>
                      <p className="text-xl text-slate-900">2,143</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    97.2% opened
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Recommendations</p>
                      <p className="text-xl text-slate-900">892</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    42% conversion
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Message Templates */}
            <Card>
              <CardHeader>
                <CardTitle>AI Message Templates</CardTitle>
                <CardDescription>
                  Smart templates for automated communication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Confirmation</Badge>
                    <span className="text-xs text-slate-500">Active</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    "Hi [Name]! Your table for [Party Size] at [Restaurant] is
                    confirmed for [Date] at [Time]. See you soon! 🎉"
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Reminder</Badge>
                    <span className="text-xs text-slate-500">Active</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    "Reminder: Your reservation at [Restaurant] is tomorrow at
                    [Time]. We can't wait to see you! ✨"
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Waitlist Update</Badge>
                    <span className="text-xs text-slate-500">Active</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    "Great news [Name]! A table just opened up for [Date] at
                    [Time]. Reply YES to claim it! ⏰"
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Templates
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Communication History */}
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
                      variant={
                        comm.status === "Opened" ? "default" : "secondary"
                      }
                    >
                      {comm.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
