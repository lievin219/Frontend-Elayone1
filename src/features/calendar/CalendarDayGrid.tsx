import { ActionButton, Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import { getCalendarCells, isSameDay } from './calendarDateUtils';
import type { Rehearsal } from '../../types';

type CalendarDayGridProps = {
  date: Date;
  selectedDay: Date;
  events: Rehearsal[];
  onSelectDay: (day: Date) => void;
};

export function CalendarDayGrid({ date, selectedDay, events, onSelectDay }: CalendarDayGridProps) {
  const cells = getCalendarCells(date);
  return (
    <Box style={styles.calendarGrid}>
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, index) => (
        <Label key={`${label}-${index}`} style={[styles.calendarWeekday, styles.calendarDarkWeekday]}>{label}</Label>
      ))}
      {cells.map((day, index) => day === null
        ? <Box key={`blank-${index}`} style={styles.calendarBlankCell} />
        : <CalendarDay key={day} day={day} month={date} selectedDay={selectedDay} events={events} onSelectDay={onSelectDay} />)}
    </Box>
  );
}

function CalendarDay({ day, month, selectedDay, events, onSelectDay }: Omit<CalendarDayGridProps, 'date'> & { month: Date; day: number }) {
  const date = new Date(month.getFullYear(), month.getMonth(), day);
  const hasEvent = events.some((event) => isSameDay(event.startsAt, date));
  const selected = isSameDay(selectedDay.toISOString(), date);
  const today = isSameDay(new Date().toISOString(), date);
  const classes = `calendar-day${hasEvent ? ' calendar-day-event' : ''}${today ? ' calendar-day-today' : ''}`;
  const label = `${date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}${hasEvent ? ', event scheduled' : ''}${today ? ', today' : ''}`;
  return (
    <ActionButton className={classes} style={[styles.calendarDayCell, hasEvent && styles.calendarDayWithEvent, today && styles.calendarDayTodayCell, selected && styles.calendarDarkDaySelected]} onPress={() => onSelectDay(date)} accessibilityRole="button" accessibilityState={{ selected }} accessibilityLabel={label}>
      <Label style={[styles.calendarDayText, styles.calendarDarkDayText, selected && styles.calendarDayTextSelected, selected && styles.calendarDarkDayTextSelected, today && !selected && styles.calendarDarkDayToday]}>{day}</Label>
      {hasEvent && <Box style={[styles.calendarEventDot, styles.calendarDarkEventDot, selected && styles.calendarEventDotSelected, selected && styles.calendarDarkEventDotSelected]} />}
    </ActionButton>
  );
}
