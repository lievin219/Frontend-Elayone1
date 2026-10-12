import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { Rehearsal } from '../../types';
import { CalendarDayGrid } from './CalendarDayGrid';
import { CalendarMonthControls } from './CalendarMonthControls';

type CalendarMonthViewProps = {
  date: Date;
  selectedDay: Date;
  events: Rehearsal[];
  onSelectDay: (day: Date) => void;
  onShift: (offset: number) => void;
  onToday: () => void;
};

export function CalendarMonthView(props: CalendarMonthViewProps) {
  return (
    <Box className="calendar-card" style={[styles.calendarCard, styles.calendarDarkCard]}>
      <CalendarMonthControls date={props.date} onShift={props.onShift} onToday={props.onToday} />
      <CalendarDayGrid date={props.date} selectedDay={props.selectedDay} events={props.events} onSelectDay={props.onSelectDay} />
      <Box style={[styles.calendarKey, styles.calendarDarkKey]}>
        <Box style={[styles.calendarEventDot, styles.calendarDarkEventDot]} />
        <Label style={[styles.calendarKeyText, styles.calendarDarkKeyText]}>{props.events.length} events this month</Label>
      </Box>
    </Box>
  );
}
