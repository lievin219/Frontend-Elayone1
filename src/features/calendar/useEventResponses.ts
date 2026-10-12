import { useState } from 'react';
import { responseDescription } from '../../types';
import type { CalendarNotice } from './calendarTypes';

export function useEventResponses(onRespond: (eventId: string, status: 'YES' | 'MAYBE' | 'NO') => Promise<void>, notify: (notice: CalendarNotice) => void) {
  const [busyEventId, setBusyEventId] = useState<string | null>(null);
  const [localResponses, setLocalResponses] = useState<Record<string, 'YES' | 'MAYBE' | 'NO'>>({});

  async function saveResponse(eventId: string, status: 'YES' | 'MAYBE' | 'NO') {
    setBusyEventId(eventId);
    try {
      await onRespond(eventId, status);
      setLocalResponses((current) => ({ ...current, [eventId]: status }));
      notify({ type: 'success', message: `${responseDescription(status)} Your response was saved for this event.` });
    } catch (error) {
      notify({ type: 'error', message: error instanceof Error ? error.message : 'We could not save your response. Please try again.' });
    } finally {
      setBusyEventId(null);
    }
  }

  return { busyEventId, localResponses, saveResponse };
}
