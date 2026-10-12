import { ActionButton, Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { EventDraft, RepeatFrequency } from './eventTypes';

const frequencies: { value: RepeatFrequency; label: string }[] = [
  { value: 'NONE', label: 'Does not repeat' }, { value: 'WEEKLY', label: 'Every week' },
  { value: 'BIWEEKLY', label: 'Every 2 weeks' }, { value: 'MONTHLY', label: 'Every month' },
];

export function RecurrenceOptions({ draft: d }: { draft: EventDraft }) {
  return <Box style={styles.priorityRow}>{frequencies.map((option) => <ActionButton key={option.value}
    style={[styles.priorityOption, d.recurrenceFrequency === option.value && styles.priorityOptionActive]}
    onPress={() => d.setRecurrenceFrequency(option.value)} accessibilityRole="button"
    accessibilityState={{ selected: d.recurrenceFrequency === option.value }}>
    <Label style={[styles.priorityText, d.recurrenceFrequency === option.value && styles.priorityTextActive]}>{option.label}</Label>
  </ActionButton>)}</Box>;
}
