import { ActionButton, Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { EventDraft } from './eventTypes';

const types = ['SERVICE', 'REHEARSAL', 'WORSHIP_NIGHT', 'SPECIAL_EVENT', 'CUSTOM'] as const;

export function EventTypeOptions({ draft: d }: { draft: EventDraft }) {
  return <>
    <Label style={[styles.fieldLabel, { marginBottom: 8 }]}>EVENT TYPE</Label>
    <Box style={styles.priorityRow}>{types.map((option) => <ActionButton key={option}
      style={[styles.priorityOption, d.eventType === option && styles.priorityOptionActive]} onPress={() => d.setEventType(option)}
      accessibilityRole="button" accessibilityState={{ selected: d.eventType === option }}
      accessibilityLabel={`Event type ${option.replace('_', ' ')}`}>
      <Label style={[styles.priorityText, d.eventType === option && styles.priorityTextActive]}>{option.replace('_', ' ')}</Label>
    </ActionButton>)}</Box>
  </>;
}
