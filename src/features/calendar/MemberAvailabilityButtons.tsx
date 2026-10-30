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
        {response === 'PENDING'
          ? event.invitationOnly ? 'You have been invited. Choose your availability:' : 'Choose your availability for this event:'
          : 'Your availability response is recorded and cannot be changed.'}
      </Label>
      {response === 'PENDING' && <Box style={styles.calendarResponseButtons}>
        {options.map((option) => <ActionButton key={option.value} disabled={busy} style={[styles.calendarResponseButton, styles.calendarDarkResponseButton]} onPress={() => onRespond(option.value)}>
          {busy
            ? <Spinner size="small" color="#111111" />
            : <Label style={[styles.calendarResponseText, styles.calendarDarkResponseText]}>{option.label}</Label>}
        </ActionButton>)}
      </Box>}
    </>
  );
}
