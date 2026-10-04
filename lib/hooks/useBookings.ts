import { useEffect, useState } from "react";
import { get } from "@/lib/api/functions";
import type { Reservation } from "@/features/bookings/types";

export function useBookings(initialBookings: Reservation[]) {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Reservation[]>(initialBookings);

  async function loadBookings() {
    try {
      setLoading(true);

      const reservations = await get<Reservation[]>("reservations");
      const sorted = [...reservations].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      setBookings(sorted);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return {
    bookings,
    loading,
    loadBookings,
  };
}

export function useBookingFilters(bookings: Reservation[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      booking.name.toLowerCase().includes(search) ||
      booking.id.toLowerCase().includes(search) ||
      booking.display_id?.toLowerCase().includes(search) ||
      booking.email?.toLowerCase().includes(search) === true;

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredBookings,
  };
}

export function usePagination<Reservation>(
  items: Reservation[],
  itemsPerPage = 8,
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedItems,
    totalItems: items.length,
    startIndex,
    endIndex: Math.min(endIndex, items.length),
  };
}
