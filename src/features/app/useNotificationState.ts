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
  const [unreadCount, setUnreadCount] = useState(0);
  const [show, setShow] = useState(false);
  const seenIds = useRef(new Set<string>());
  const initialized = useRef(false);

  useEffect(() => {
    if (!sessionActive) {
      setHasNew(false);
      setUnreadCount(0);
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
    if (initialized.current) {
      const addedCount = [...ids].filter((id) => !seenIds.current.has(id)).length;
      if (addedCount > 0) {
        setHasNew(true);
        setUnreadCount((count) => count + addedCount);
      }
    }
    initialized.current = true;
    seenIds.current = ids;
  }, [announcements, reminders, lastRefresh, sessionActive]);

  function open() {
    setHasNew(false);
    setUnreadCount(0);
    setShow(true);
  }

  function recordAnnouncement(id: string) {
    seenIds.current.add(`announcement:${id}`);
    setHasNew(true);
    setUnreadCount((count) => count + 1);
  }

  function removeAnnouncement(id: string) {
    seenIds.current.delete(`announcement:${id}`);
  }

  return { hasNew, unreadCount, show, setShow, open, recordAnnouncement, removeAnnouncement };
}
