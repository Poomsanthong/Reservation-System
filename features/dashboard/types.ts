export type StatsData = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  change: string;
  trend: string;
};

export type StatsCardProps = {
  totalBookings: number | null;
  totalGuests: number | null;
  previousTotalBookings: number | null;
  previousTotalGuests: number | null;
};
