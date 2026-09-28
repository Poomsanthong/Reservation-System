import { OpeningHoursProps, DAYS, DAY_TO_NUMBER } from "@/lib/types";
import { Input } from "../ui/input";

export default function OpeningHours({
  hours,
  onToggleDay,
  onSetTime,
}: OpeningHoursProps) {
  return (
    <fieldset>
      <legend className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4 block">
        Operating hours
      </legend>

      <div className="space-y-2">
        {DAYS.map((day) => {
          const hour = hours.find(
            (hour) => hour.dayOfWeek === DAY_TO_NUMBER[day],
          );

          return (
            <div
              key={day}
              className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                hour?.open ? "bg-[#111009]" : "bg-transparent opacity-60"
              }`}
            >
              {/* Toggle */}
              <button
                type="button"
                onClick={() => onToggleDay(day)}
                className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${
                  hour?.open ? "bg-[#d4821a]" : "bg-[#2e2b25]"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    hour?.open ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>

              {/* Day */}
              <span className="text-xs text-[#f5f0e8] w-8 shrink-0 font-medium">
                {day}
              </span>

              {hour?.open ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    value={hour.openTime}
                    onChange={(e) => onSetTime(day, "openTime", e.target.value)}
                    className="bg-[#1a1814] border-[#2e2b25] text-[#f5f0e8] text-xs px-2 py-1.5 flex-1"
                  />

                  <span className="text-[#4a4740] text-xs">–</span>

                  <Input
                    type="time"
                    value={hour.closeTime}
                    onChange={(e) =>
                      onSetTime(day, "closeTime", e.target.value)
                    }
                    className="bg-[#1a1814] border-[#2e2b25] text-[#f5f0e8] text-xs px-2 py-1.5 flex-1"
                  />
                </div>
              ) : (
                <Input
                  type="text"
                  value="Closed"
                  readOnly
                  className="bg-[#1a1814] border-[#2e2b25] text-[#f5f0e8] text-xs px-2 py-1.5 flex-1"
                />
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
