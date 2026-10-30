import type { Rehearsal } from '../../types';

export function formatEventDate(input: string, includeWeekday = true) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return 'Date to be confirmed';
  return new Intl.DateTimeFormat(undefined, {
    ...(includeWeekday ? { weekday: 'long' as const } : {}),
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatEventTime(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return 'Time to be confirmed';
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
}

export function formatEventTimeRange(startsAt: string, endsAt: string) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 'Time to be confirmed';
  const timeRange = `${formatEventTime(startsAt)}–${formatEventTime(endsAt)}`;
  return isSameDay(startsAt, end) ? timeRange : `${timeRange} · ends ${formatEventDate(endsAt)}`;
}

export function formatEventDateParts(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return { weekday: '—', day: '—', month: '—' };
  const parts = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short' }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    weekday: (values.weekday ?? '—').toUpperCase(),
    day: values.day ?? '—',
    month: (values.month ?? '—').toUpperCase(),
  };
}

export function isSameDay(dateString: string, day: Date) {
  const date = new Date(dateString);
  return date.getFullYear() === day.getFullYear()
    && date.getMonth() === day.getMonth()
    && date.getDate() === day.getDate();
}

export function getMonthEvents(events: Rehearsal[], date: Date) {
  return events
    .filter((event) => {
      const startsAt = new Date(event.startsAt);
      return startsAt.getFullYear() === date.getFullYear()
        && startsAt.getMonth() === date.getMonth();
    })
    .sort((left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt));
}

export function getUpcomingEvents(events: Rehearsal[]) {
  return events
    .filter((event) => Date.parse(event.endsAt) >= Date.now())
    .sort((left, right) => Date.parse(left.startsAt) - Date.parse(right.startsAt));
}

export function getCalendarCells(date: Date): Array<number | null> {
  const year = date.getFullYear();
  const month = date.getMonth();
  const blanks = new Array<number | null>(new Date(year, month, 1).getDay()).fill(null);
  const days = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, index) => index + 1);
  return [...blanks, ...days];
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
