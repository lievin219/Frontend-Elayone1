import { useState } from 'react';
import { responseDescription } from '../../types';
import type { AttendanceResponseStatus } from '../../api';
import type { CalendarNotice } from './calendarTypes';

export function useEventResponses(onRespond: (eventId: string, status: AttendanceResponseStatus) => Promise<void>, notify: (notice: CalendarNotice) => void) {
  const [busyEventId, setBusyEventId] = useState<string | null>(null);
  const [localResponses, setLocalResponses] = useState<Record<string, AttendanceResponseStatus>>({});

  async function saveResponse(eventId: string, status: AttendanceResponseStatus) {
    setBusyEventId(eventId);
    try {
      await onRespond(eventId, status);
      setLocalResponses((current) => ({ ...current, [eventId]: status }));
      notify({ type: 'success', message: status === 'PENDING' ? 'Your response was removed for this event.' : `${responseDescription(status)} Your response was saved for this event.` });
    } catch (error) {
      notify({ type: 'error', message: error instanceof Error ? error.message : 'We could not save your response. Please try again.' });
    } finally {
      setBusyEventId(null);
    }
  }

  return { busyEventId, localResponses, saveResponse };
}
