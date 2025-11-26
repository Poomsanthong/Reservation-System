// used to calculate percentage change and trend direction
function calculateChange(current: number, previous: number) {
  if (previous === 0) return { change: "0%", trend: "up" }; // avoid division-by-zero

  const percent = ((current - previous) / previous) * 100;
  const rounded = percent.toFixed(1) + "%";

  return {
    change: rounded,
    trend: percent >= 0 ? "up" : "down",
  };
}

export { calculateChange };
