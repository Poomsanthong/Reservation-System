import type {
  MessageStatsResponse,
  MessageTemplate,
  RecentMessage,
} from "@/features/messages/types";
import { request } from "@/shared/api/client";

export async function updateTemplate(
  id: MessageTemplate["id"],
  updates: Pick<MessageTemplate, "subject" | "html">,
) {
  return request<{ success: true }>("/api/templates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });
}

export async function getMessageStats() {
  return request<MessageStatsResponse>("/api/messages/message-stats");
}

export async function getRecentMessages() {
  return request<RecentMessage[]>("/api/messages");
}

export async function getTemplates() {
  return request<MessageTemplate[]>("/api/templates");
}
