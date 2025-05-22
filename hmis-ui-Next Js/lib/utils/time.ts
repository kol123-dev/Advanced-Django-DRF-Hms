export function calculateWaitTime(arrival: string): number {
  const now = new Date();
  const then = new Date(arrival);
  const diffMinutes = Math.floor((now.getTime() - then.getTime()) / 60000);
  return diffMinutes > 0 ? diffMinutes : 0;
}

export function formatArrival(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
