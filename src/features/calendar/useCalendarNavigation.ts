import { useState } from 'react';
import type { Rehearsal } from '../../types';
import { startOfMonth } from './calendarDateUtils';

export function useCalendarNavigation() {
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState(() => new Date());

  function shiftMonth(offset: number) {
    const next = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(next);
    setSelectedDay(next);
  }

  function jumpToToday() {
    const today = new Date();
    setViewDate(startOfMonth(today));
    setSelectedDay(today);
  }

  function showEventDate(event: Rehearsal) {
    const date = new Date(event.startsAt);
    setViewDate(startOfMonth(date));
    setSelectedDay(date);
  }

  return { viewDate, selectedDay, setSelectedDay, shiftMonth, jumpToToday, showEventDate };
}
