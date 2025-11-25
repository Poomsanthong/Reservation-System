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

import { cancelBooking, get, updateBooking } from "@/lib/api/funtions";

import { useModalStore } from "@/store/useModalStore";
import { ta } from "date-fns/locale";

export function BookingsTable({ bookings }: { bookings: Reservation[] }) {
  const [loading, setLoading] = useState(true);
  const [bookingsData, setBookingsData] = useState<Reservation[]>(bookings);
  const [searchTerm, setSearchTerm] = useState("");

  const { open, type, payload, openModal, closeModal } = useModalStore();

  // -----------------------
  // LOAD BOOKINGS
  // -----------------------
  async function loadBookings() {
    try {
      setLoading(true);

      const res = await get("reservations");

      if (res.error) throw res.error;

      setBookingsData(res.data || []);
    } catch (err) {
      setBookingsData([]); // fallback
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  // -----------------------
  // HANDLE ACTION
  // -----------------------
  function handleAction(
    type: "view" | "edit" | "cancel" | "send_reminder",
    booking: Reservation
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
  async function handleSubmit(updated: Reservation) {
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
      booking.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    if (status === "confirmed") return <CheckCircle2 className="w-4 h-4" />;
    if (status === "cancelled") return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const getStatusVariant = (status: string) => {
    if (status === "confirmed") return "default";
    if (status === "cancelled") return "destructive";
    return "secondary";
  };

  // -----------------------
  // RENDER
  // -----------------------
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, ID, or email…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
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
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.reservation_date}</TableCell>
                    <TableCell>{booking.partySize} guests</TableCell>

                    <TableCell>
                      <Badge variant={getStatusVariant(booking.status!)}>
                        {getStatusIcon(booking.status!)} {booking.status}
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
