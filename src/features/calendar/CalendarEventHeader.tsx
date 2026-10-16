import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { CalendarEventCardProps } from './calendarTypes';
import { responseLabels } from '../../types';

const responseStyles = {
  YES: styles.reportPillYes,
  MAYBE: styles.reportPillMaybe,
  NO: styles.reportPillNo,
  PENDING: styles.reportPillPending,
};

export function CalendarEventHeader({ event, response }: Pick<CalendarEventCardProps, 'event' | 'response'>) {
  const start = new Date(event.startsAt);
  const end = new Date(event.endsAt);
  return (
    <Box style={styles.calendarEventCardTop}>
      <Box style={[styles.calendarDateBadge, styles.calendarDarkDateBadge]}>
        <Label className="calendar-date-caption" style={[styles.calendarDateDay, styles.calendarDarkDateText]}>{start.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase()}</Label>
        <Label style={[styles.calendarDateNumber, styles.calendarDarkDateText]}>{start.getDate()}</Label>
        <Label className="calendar-date-caption" style={[styles.calendarDateMonth, styles.calendarDarkDateText]}>{start.toLocaleDateString(undefined, { month: 'short' }).toUpperCase()}</Label>
      </Box>
      <Box style={{ flex: 1 }}>
        <Label style={[styles.calendarEventTitle, styles.calendarDarkEventTitle]}>{event.title}</Label>
        <Label className="calendar-event-meta" style={[styles.calendarEventMeta, styles.calendarDarkEventMeta]}>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}–{end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {event.location}</Label>
        <Label style={[styles.calendarEventType, styles.calendarDarkEventType]}>{(event.eventTypeName ?? event.eventType ?? 'REHEARSAL').replace('_', ' ')} · {event.invitationOnly ? 'PERSONAL INVITE' : 'WHOLE MINISTRY'}</Label>
      </Box>
      <Box style={[styles.reportPill, responseStyles[response]]}>
        <Label style={styles.reportPillText}>{response === 'PENDING' && event.invitationOnly ? 'Awaiting response' : responseLabels[response]}</Label>
      </Box>
    </Box>
  );
}
