import { Box, Icon, Label } from '../../components/WebUI';
import { styles } from '../../theme';

export function CalendarEmpty({ text }: { text: string }) {
  return (
    <Box style={styles.calendarDarkEmpty}>
      <Icon name="calendar-outline" size={21} color="#b7b7b7" />
      <Label style={styles.calendarDarkEmptyText}>{text}</Label>
    </Box>
  );
}
