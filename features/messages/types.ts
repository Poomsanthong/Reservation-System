export type MessageType = "confirmation" | "reminder";

export type MessageStatsBreakdown = {
  total: number;
  delivered: number;
  opened: number;
  deliveredPercentage: number;
  openedPercentage: number;
};

export type MessageStatsResponse = {
  confirmations: MessageStatsBreakdown;
  reminders: MessageStatsBreakdown;
};

export type MessageTemplate = {
  id: string;
  type: MessageType;
  subject: string;
  html: string;
};

export type RecentMessage = {
  id: string;
  type: MessageType;
  reminder_state: string | null;
  created_at: string;
  booking_id: {
    name: string;
    email: string | null;
  } | null;
};

