"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! Welcome to BookFlow. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // send message to ai api
  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = draft.trim();

    if (!message || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: message },
    ]);
    setDraft("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,

          messages: [...messages, { role: "user", content: message }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open BookFlow AI assistant"
        className="fixed z-50 right-4 bottom-4 sm:right-6 sm:bottom-6 size-14 rounded-full bg-main-gradient text-accent-foreground shadow-[0_12px_40px_rgba(0,0,0,0.45)]  hover:-translate-y-0.5 transition-all flex items-center justify-center"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5.25 5.75h13.5v9.5H11l-4.75 3v-3h-1a2 2 0 0 1-2-2v-5.5a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.5h.01M12 10.5h.01M16 10.5h.01"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    );
  }
  return (
    <section
      aria-label="tablefront AI assistant"
      className="fixed z-50 right-3 bottom-3 sm:right-6 sm:bottom-6 w-[calc(100%-1.5rem)] sm:w-[380px] h-[min(540px,calc(100dvh-1.5rem))] rounded-xl overflow-hidden bg-white text-[#1a1814] shadow-[0_24px_80px_rgba(0,0,0,0.55)] border border-white flex flex-col"
    >
      <header className="bg-[#111009] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-main-gradient flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5.25 5.75h13.5v9.5H11l-4.75 3v-3h-1a2 2 0 0 1-2-2v-5.5a2 2 0 0 1 2-2Z"
                stroke="#1a1814"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[#f5f0e8] text-lg leading-tight">
              BookFlow AI
            </h2>
            <p className="text-[#8b8070] text-[11px] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-main-gradient" />
              Here to help with reservations
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close AI assistant"
          className="size-9 rounded-full border border-[#2e2b25] text-[#8b8070] hover:text-[#f5f0e8] hover:border-[#4a4740] transition-colors flex items-center justify-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div
        className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
        aria-live="polite"
      >
        <p className="text-center text-[10px] uppercase tracking-[0.15em] text-[#8b8070]">
          Today
        </p>
        {loading && (
          <p className="text-sm text-[#8b8070]">BookFlow AI is thinking...</p>
        )}
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-[#d4821a] text-[#1a1814] rounded-br-sm"
                  : "bg-white border border-[#e5ddd1] text-[#4a4740] rounded-bl-sm"
              }`}
            >
              {/* user input display */}
              {message.content}
            </p>
          </div>
        ))}
        {loading && (
          <p className="text-sm text-[#8b8070]">BookFlow AI is thinking...</p>
        )}
      </div>

      <form
        onSubmit={sendMessage}
        className="border-t border-[#d8cfc1] bg-white p-3 flex items-end gap-2"
      >
        <label htmlFor="chat-message" className="sr-only">
          Message BookFlow AI
        </label>
        <textarea
          id="chat-message"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          rows={1}
          placeholder="Ask about getting started..."
          className="min-h-11 max-h-28 flex-1 resize-none rounded-lg bg-[#f5f0e8] border border-[#d8cfc1] px-3 py-3 text-sm text-[#1a1814] placeholder:text-[#8b8070] focus:border-[#d4821a] transition-colors"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Send message"
          className="size-11 rounded-lg bg-main-gradient text-accent opacity-40 hover:opacity-90 transition-opacity  flex items-center justify-center shrink-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </form>
    </section>
  );
}
