import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import { responseLabels } from '../../types';
import type { CalendarEventCardProps } from './calendarTypes';

export function EventInviteeList({ invitees }: { invitees: NonNullable<CalendarEventCardProps['event']['invitees']> }) {
  return (
    <Box style={styles.calendarInviteeList}>
      {invitees.map((member) => <Box key={member.userId} style={[styles.calendarInviteeRow, styles.calendarDarkInviteeRow]}>
        <Label style={[styles.calendarInviteeName, styles.calendarDarkInviteeName]}>{member.name}</Label>
        <Label style={[styles.calendarInviteeStatus, member.status === 'YES' ? styles.reportAvailableText : member.status === 'NO' ? styles.reportUnavailableText : styles.reportPendingText]}>{responseLabels[member.status]}</Label>
      </Box>)}
    </Box>
  );
}
