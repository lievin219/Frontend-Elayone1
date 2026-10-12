import { Box } from '../../components/WebUI';
import { styles } from '../../theme';
import type { CalendarEventCardProps } from './calendarTypes';
import { CalendarEventHeader } from './CalendarEventHeader';
import { GoogleCalendarButton } from './GoogleCalendarButton';
import { CalendarEventSongs } from './CalendarEventSongs';
import { EventAttendance } from './EventAttendance';

export function CalendarEventCard(props: CalendarEventCardProps) {
  return (
    <Box style={[styles.calendarEventCard, styles.calendarDarkEventCard]}>
      <CalendarEventHeader event={props.event} response={props.response} />
      <GoogleCalendarButton event={props.event} />
      <CalendarEventSongs event={props.event} songs={props.songs} canManage={props.canManage} onSaveSongs={props.onSaveSongs} />
      <EventAttendance {...props} />
    </Box>
  );
}
