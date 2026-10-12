import { useEffect, useRef, useState } from 'react';
import type { ReminderRecord } from '../../api';
import type { AnnouncementItem } from '../../types';

export function useNotificationState(
  announcements: AnnouncementItem[],
  reminders: ReminderRecord[],
  lastRefresh: Date | null,
  sessionActive: boolean,
) {
  const [hasNew, setHasNew] = useState(false);
  const [show, setShow] = useState(false);
  const seenIds = useRef(new Set<string>());
  const initialized = useRef(false);

  useEffect(() => {
    if (!sessionActive) {
      setHasNew(false);
      setShow(false);
      seenIds.current.clear();
      initialized.current = false;
      return;
    }
    if (!lastRefresh) return;
    const ids = new Set([
      ...announcements.map((item) => `announcement:${item.id}`),
      ...reminders.map((item) => `reminder:${item.id}`),
    ]);
    if (initialized.current && [...ids].some((id) => !seenIds.current.has(id))) setHasNew(true);
    initialized.current = true;
    seenIds.current = ids;
  }, [announcements, reminders, lastRefresh, sessionActive]);

  function open() {
    setHasNew(false);
    setShow(true);
  }

  function recordAnnouncement(id: string) {
    seenIds.current.add(`announcement:${id}`);
    setHasNew(true);
  }

  function removeAnnouncement(id: string) {
    seenIds.current.delete(`announcement:${id}`);
  }

  return { hasNew, show, setShow, open, recordAnnouncement, removeAnnouncement };
}
