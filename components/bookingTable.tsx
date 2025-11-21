"use client"; // This file runs in the browser (not on the server)
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { PUT } from "@/app/api/reservations/[id]/route";

interface Booking {
  id: string;
  guest: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  status: string;
  special?: string;
}

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: "BK-2847",
    guest: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1 (555) 123-4567",
    date: "2025-11-20",
    time: "7:00 PM",
    partySize: 4,
    status: "confirmed",
    special: "Window seat",
  },
];

export function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let active = true;
    async function loadBookings() {
      try {
        const res = await fetch("/api/reservations");

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        if (active) setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadBookings();
    return () => {
      active = false;
    };
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const guest = booking.guest || "";
    const id = booking.id || "";
    const email = booking.email || "";

    const matchesSearch =
      guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "pending":
      case "waitlist":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (
    status: string
  ): "default" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case "confirmed":
        return "default";
      case "cancelled":
        return "destructive";
      case "pending":
      case "waitlist":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Reservations</CardTitle>
            <CardDescription>
              Manage and track all customer bookings
            </CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="waitlist">Waitlist</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Party Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Special Requests</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm">
                    Loading bookings...
                  </TableCell>
                </TableRow>
              )}
              {!loading && filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm">
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-sm">
                      {booking.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-slate-900">{booking.guest}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-slate-600">{booking.email}</p>
                        <p className="text-slate-500">{booking.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-slate-900">{booking.date}</p>
                        <p className="text-slate-600">{booking.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-900">
                      {booking.partySize} guests
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(booking.status)}
                        className="gap-1"
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {booking.special || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              console.log("Edit booking:", booking.email)
                            }
                          >
                            Edit Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-600">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
