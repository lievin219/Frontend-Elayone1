import { useEffect, useState } from 'react';
import type { AttendanceSummary } from '../../api';
import type { Rehearsal, SongItem } from '../../types';
import { formatRehearsalDate } from '../../types';

export function useDashboardState(events: Rehearsal[], summary: AttendanceSummary, songs: SongItem[]) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const ordered = [...events].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const active = ordered.find((item) => Date.now() >= Date.parse(item.startsAt) && Date.now() <= Date.parse(item.endsAt)) ?? null;
  const next = active ?? ordered.find((item) => Date.parse(item.startsAt) > Date.now()) ?? ordered[0] ?? null;
  const title = next?.title?.toLowerCase() ?? '';
  const eventType = title.includes('worship') ? 'WORSHIP NIGHT' : title.includes('service') ? 'SUNDAY SERVICE' : title.includes('rehearsal') ? 'REHEARSAL' : title.includes('event') ? 'SPECIAL EVENT' : 'ASSIGNMENT';

  return {
    now, ordered, active, next, nextParts: next ? formatRehearsalDate(next.startsAt) : null,
    upcoming: ordered.filter((item) => Date.parse(item.startsAt) >= now.getTime()).length,
    eventType, liveLabel: active ? 'ACTIVE SERVICE' : 'NEXT ASSIGNMENT',
    liveState: active ? 'LIVE' : next ? 'UPCOMING' : 'NO EVENT', summary, songs,
  };
}
