import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { styles } from '../../theme';

type CalendarMonthControlsProps = {
  date: Date;
  onShift: (offset: number) => void;
  onToday: () => void;
};

export function CalendarMonthControls({ date, onShift, onToday }: CalendarMonthControlsProps) {
  return (
    <Box style={styles.calendarMonthHeader}>
      <ActionButton style={[styles.calendarArrow, styles.calendarDarkArrow]} onPress={() => onShift(-1)} accessibilityLabel="Previous month">
        <Icon name="chevron-back" size={19} color="#ffffff" />
      </ActionButton>
      <Label style={[styles.calendarMonthTitle, styles.calendarDarkMonthTitle]}>
        {date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
      </Label>
      <ActionButton style={styles.calendarTodayButton} onPress={onToday}>
        <Label style={styles.calendarTodayText}>Today</Label>
      </ActionButton>
      <ActionButton style={[styles.calendarArrow, styles.calendarDarkArrow]} onPress={() => onShift(1)} accessibilityLabel="Next month">
        <Icon name="chevron-forward" size={19} color="#ffffff" />
      </ActionButton>
    </Box>
  );
}
