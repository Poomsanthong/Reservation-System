"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import {
  Filter,
  Search,
  MoreHorizontal,
  Download,
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
} from "../../ui/dropdown-menu";

import ViewDetailsModal from "../../modal/ViewDetailsModal";
import EditModal from "../../modal/EditModal";
import CancelModal from "../../modal/CancelModal";
import type {
  BookingStatus,
  Reservation,
  UpdateReservationInput,
} from "@/features/bookings/types";

import { cancelBooking, get, updateBooking } from "@/lib/api/functions";

import { useModalStore } from "@/store/useModalStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BookingsTable({ bookings }: { bookings: Reservation[] }) {
  const [loading, setLoading] = useState(true);
  const [bookingsData, setBookingsData] = useState<Reservation[]>(bookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { open, type, payload, openModal, closeModal } = useModalStore();

  // -----------------------
  // LOAD BOOKINGS
  // -----------------------
  async function loadBookings() {
    try {
      setLoading(true);

      const reservations = await get<Reservation[]>("reservations");
      const sorted = [...reservations].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      setBookingsData(sorted);
    } catch {
      setBookingsData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter]);

  // -----------------------
  // HANDLE ACTION
  // -----------------------
  function handleAction(
    type: "view" | "edit" | "cancel" | "send_reminder",
    booking: Reservation,
  ) {
    if (type === "send_reminder") {
      alert(`Reminder sent to ${booking.email}`);
      return;
    }

    openModal(type, booking); // Zustand handles everything
  }

  // -----------------------
  // HANDLE SUBMIT (edit/cancel)
  // -----------------------
  async function handleSubmit(updated: UpdateReservationInput) {
    if (!payload) return;

    if (type === "edit") {
      await updateBooking(payload.id, updated);
    }

    if (type === "cancel") {
      await cancelBooking(payload.id, "cancelled");
    }

    closeModal();
    await loadBookings();
  }

  // -----------------------
  // FILTER
  // -----------------------
  const filteredBookings = bookingsData.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) === true;

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: BookingStatus) => {
    if (status === "confirmed") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "cancelled") return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const getStatusVariant = (status: BookingStatus) => {
    if (status === "confirmed") return "default";
    if (status === "cancelled") return "destructive";
    return "secondary";
  };

  // -----------------------
  // PAGINATION
  // -----------------------
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // todo implement export functionality , move frontend logic to backend for filtering and pagination , booking id change to display id and add a new column for booking id in the backend
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Reservations</CardTitle>
            <CardDescription>Manage and track all bookings</CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />{" "}
            <Input
              placeholder="Search by name, ID, or email"
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

        {/* TABLE */}
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
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    Loading…
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                paginatedBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <p>{booking.email}</p>
                        <p>{booking.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <p>{booking.reservation_date}</p>
                        <p>{booking.reservation_time}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.partysize} guests</TableCell>
                    <TableCell>
                      <Badge
                        className="gap-1 capitalize"
                        variant={getStatusVariant(booking.status)}
                      >
                        {getStatusIcon(booking.status)} {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{booking.note || "-"}</TableCell>
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

                          <DropdownMenuItem
                            onClick={() => handleAction("view", booking)}
                          >
                            View Details
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleAction("edit", booking)}
                          >
                            Edit Booking
                          </DropdownMenuItem>

                          {booking.status !== "cancelled" && (
                            <DropdownMenuItem
                              onClick={() => handleAction("cancel", booking)}
                              className="text-red-600"
                            >
                              Cancel Booking
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between border-t px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            {filteredBookings.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}
            –{Math.min(currentPage * ITEMS_PER_PAGE, filteredBookings.length)}{" "}
            of {filteredBookings.length} bookings
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              Page {currentPage} of {Math.max(totalPages, 1)}
            </span>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* MODALS (dynamic via Zustand) */}
        {type === "view" && (
          <ViewDetailsModal
            open={open}
            onOpenChange={closeModal}
            booking={payload}
          />
        )}

        {type === "edit" && (
          <EditModal
            open={open}
            onOpenChange={closeModal}
            booking={payload}
            onSubmit={handleSubmit}
          />
        )}

        {type === "cancel" && (
          <CancelModal
            open={open}
            onOpenChange={closeModal}
            booking={payload}
            onSubmit={() => handleSubmit(payload)}
          />
        )}
      </CardContent>
    </Card>
  );
}
