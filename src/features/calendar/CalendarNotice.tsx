import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { CalendarNotice as Notice } from './calendarTypes';

export function CalendarNotice({ notice }: { notice: Notice | null }) {
  if (!notice) return null;
  const success = notice.type === 'success';
  return (
    <Box style={[styles.noticeBanner, success ? styles.noticeSuccess : styles.noticeError]} accessibilityRole="alert">
      <Label style={[styles.noticeText, success ? styles.noticeTextSuccess : styles.noticeTextError]}>
        {notice.message}
      </Label>
    </Box>
  );
}
