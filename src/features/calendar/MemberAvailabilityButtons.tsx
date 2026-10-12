import { ActionButton, Box, Label, Spinner } from '../../components/WebUI';
import { styles } from '../../theme';
import type { CalendarEventCardProps } from './calendarTypes';

const options = [
  { value: 'YES', label: 'I am available' },
  { value: 'MAYBE', label: 'I am unsure' },
  { value: 'NO', label: 'I am unavailable' },
] as const;

export function MemberAvailabilityButtons({ event, response, busy, onRespond }: Pick<CalendarEventCardProps, 'event' | 'response' | 'busy' | 'onRespond'>) {
  return (
    <>
      <Label style={[styles.calendarPrompt, styles.calendarDarkPrompt]}>
        {event.invitationOnly ? 'You have been invited. Choose your availability:' : 'Choose your availability for this event:'}
      </Label>
      <Box style={styles.calendarResponseButtons}>
        {options.map((option) => <ActionButton key={option.value} disabled={busy} style={[styles.calendarResponseButton, styles.calendarDarkResponseButton, response === option.value && styles.calendarDarkResponseButtonActive]} onPress={() => onRespond(option.value)}>
          {busy && response === option.value
            ? <Spinner size="small" color="#111111" />
            : <Label style={[styles.calendarResponseText, styles.calendarDarkResponseText, response === option.value && styles.calendarDarkResponseTextActive]}>{option.label}</Label>}
        </ActionButton>)}
      </Box>
    </>
  );
}
