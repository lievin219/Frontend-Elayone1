import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { CalendarEventCardProps } from './calendarTypes';
import { responseLabels } from '../../types';
import { formatEventDate, formatEventDateParts, formatEventTimeRange } from './calendarDateUtils';

const responseStyles = {
  YES: styles.reportPillYes,
  MAYBE: styles.reportPillMaybe,
  NO: styles.reportPillNo,
  PENDING: styles.reportPillPending,
};

export function CalendarEventHeader({ event, response }: Pick<CalendarEventCardProps, 'event' | 'response'>) {
  const dateParts = formatEventDateParts(event.startsAt);
  return (
    <Box style={styles.calendarEventCardTop}>
      <Box style={[styles.calendarDateBadge, styles.calendarDarkDateBadge]}>
        <Label className="calendar-date-caption" style={[styles.calendarDateDay, styles.calendarDarkDateText]}>{dateParts.weekday}</Label>
        <Label style={[styles.calendarDateNumber, styles.calendarDarkDateText]}>{dateParts.day}</Label>
        <Label className="calendar-date-caption" style={[styles.calendarDateMonth, styles.calendarDarkDateText]}>{dateParts.month}</Label>
      </Box>
      <Box style={{ flex: 1 }}>
        <Label style={[styles.calendarEventTitle, styles.calendarDarkEventTitle]}>{event.title}</Label>
        <Label className="calendar-event-meta" style={[styles.calendarEventMeta, styles.calendarDarkEventMeta]}>{formatEventDate(event.startsAt, false)} · {formatEventTimeRange(event.startsAt, event.endsAt)} · {event.location}</Label>
        <Label style={[styles.calendarEventType, styles.calendarDarkEventType]}>{(event.eventTypeName ?? event.eventType ?? 'REHEARSAL').replace('_', ' ')} · {event.invitationOnly ? 'PERSONAL INVITE' : 'WHOLE MINISTRY'}</Label>
      </Box>
      <Box style={[styles.reportPill, responseStyles[response]]}>
        <Label style={styles.reportPillText}>{response === 'PENDING' && event.invitationOnly ? 'Awaiting response' : responseLabels[response]}</Label>
      </Box>
    </Box>
  );
}
