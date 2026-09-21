export type RestaurantSettings = {
  id: string;
  restaurant_id: string;
  auto_accept: boolean;
  waitlist_enabled: boolean;
  max_party_size: number;
  booking_interval: number;
  booking_window: number;
  min_notice_hours: number;
  avg_table_duration: number;
  max_daily_capacity: number | null;
  max_slot_capacity: number | null;
  created_at: string;
  updated_at: string;
};

export type UpdateRestaurantSettingsInput = Partial<RestaurantSettings> & {
  id: string;
};
