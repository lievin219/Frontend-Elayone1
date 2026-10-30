import type { Rehearsal, SongItem } from '../../types';
import type { AttendanceResponseStatus } from '../../api';
import type { CalendarEventCardProps } from './calendarTypes';
import { CalendarEventList } from './CalendarEventList';
import { formatEventDate } from './calendarDateUtils';

type CalendarEventSectionsProps = {
  selectedDay: Date;
  dayEvents: Rehearsal[];
  upcomingEvents: Rehearsal[];
  songs: SongItem[];
  canManage: boolean;
  busyEventId: string | null;
  localResponses: Record<string, AttendanceResponseStatus>;
  onSaveSongs: CalendarEventCardProps['onSaveSongs'];
  onRespond: (eventId: string, status: AttendanceResponseStatus) => void;
};

export function CalendarEventSections(props: CalendarEventSectionsProps) {
  const shared = {
    songs: props.songs,
    canManage: props.canManage,
    busyEventId: props.busyEventId,
    onSaveSongs: props.onSaveSongs,
    responseFor: (event: Rehearsal) => props.localResponses[event.id] ?? event.myStatus ?? 'PENDING',
    onRespond: props.onRespond,
  };
  return <>
    <CalendarEventList {...shared} title={formatEventDate(props.selectedDay.toISOString())} events={props.dayEvents} emptyText="Nothing scheduled for this day. Tap a marked date to view its events." />
    <CalendarEventList {...shared} title="Coming up" events={props.upcomingEvents.slice(0, 12)} emptyText="No upcoming events have been scheduled." />
  </>;
}
