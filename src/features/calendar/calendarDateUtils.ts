import type { Rehearsal } from '../../types';

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
