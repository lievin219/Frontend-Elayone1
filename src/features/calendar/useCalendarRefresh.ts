import { useEffect, useRef, useState } from 'react';
import type { CalendarNotice } from './calendarTypes';

export function useCalendarRefresh(canManage: boolean, onRefresh: () => Promise<void>, notify: (notice: CalendarNotice) => void) {
  const [refreshing, setRefreshing] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState(() => new Date());
  const refreshRef = useRef(onRefresh);
  refreshRef.current = onRefresh;

  useEffect(() => {
    if (!canManage) return;
    const timer = setInterval(() => {
      refreshRef.current()
        .then(() => setLastCheckedAt(new Date()))
        .catch((error: unknown) => notify({
          type: 'error',
          message: error instanceof Error ? error.message : 'Could not refresh event responses.',
        }));
    }, 10000);
    return () => clearInterval(timer);
  }, [canManage, notify]);

  async function refreshNow() {
    setRefreshing(true);
    try {
      await refreshRef.current();
      setLastCheckedAt(new Date());
    } catch (error) {
      notify({ type: 'error', message: error instanceof Error ? error.message : 'Could not refresh event responses.' });
    } finally {
      setRefreshing(false);
    }
  }

  return { refreshing, lastCheckedAt, refreshNow };
}
