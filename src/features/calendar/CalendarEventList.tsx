import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { AttendanceResponseStatus } from '../../api';
import type { Rehearsal } from '../../types';
import type { CalendarEventCardProps } from './calendarTypes';
import { CalendarEmpty } from './CalendarEmpty';
import { CalendarEventCard } from './CalendarEventCard';

type CalendarEventListProps = Pick<CalendarEventCardProps, 'songs' | 'canManage' | 'onSaveSongs'> & {
  title: string;
  events: Rehearsal[];
  busyEventId: string | null;
  responseFor: (event: Rehearsal) => CalendarEventCardProps['response'];
  onRespond: (eventId: string, status: AttendanceResponseStatus) => void;
  emptyText: string;
};

export function CalendarEventList(props: CalendarEventListProps) {
  return (
    <>
      <Box style={styles.calendarListHeader}>
        <Label style={styles.calendarDarkSectionTitle}>{props.title}</Label>
        <Label style={styles.calendarDarkSectionMeta}>{props.events.length} events</Label>
      </Box>
      {props.events.length === 0
        ? <CalendarEmpty text={props.emptyText} />
        : props.events.map((event) => <CalendarEventCard
          key={`${props.title}-${event.id}`}
          event={event}
          songs={props.songs}
          canManage={props.canManage}
          response={props.responseFor(event)}
          busy={props.busyEventId === event.id}
          onSaveSongs={props.onSaveSongs}
          onRespond={(status) => props.onRespond(event.id, status)}
        />)}
    </>
  );
}
