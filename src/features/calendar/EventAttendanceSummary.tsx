import { Box, Icon, Label } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import type { CalendarEventCardProps } from './calendarTypes';
import { EventInviteeList } from './EventInviteeList';

export function EventAttendanceSummary({ event }: Pick<CalendarEventCardProps, 'event'>) {
  const invitees = event.invitees ?? [];
  const yes = invitees.filter((member) => member.status === 'YES').length;
  const no = invitees.filter((member) => member.status === 'NO').length;
  const awaiting = invitees.filter((member) => member.status === 'PENDING' || member.status === 'MAYBE').length;
  const summary = event.invitees ? `${yes} accepted · ${no} declined · ${awaiting} awaiting` : `${event.confirmedCount ?? 0} accepted`;
  return (
    <>
      <Box style={[styles.calendarAdminSummary, styles.calendarDarkAdminSummary]}>
        <Icon name="people-outline" size={15} color={COLORS.muted} />
        <Label style={[styles.calendarAdminSummaryText, styles.calendarDarkAdminSummaryText]}>{summary}</Label>
      </Box>
      {invitees.length > 0 && <EventInviteeList invitees={invitees} />}
    </>
  );
}
