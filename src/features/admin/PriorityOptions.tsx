import { ActionButton, Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { AnnouncementItem } from '../../types';

type Priority = AnnouncementItem['priority'];

export function PriorityOptions({ value, onChange }: { value: Priority; onChange: (value: Priority) => void }) {
  return <Box style={styles.priorityRow}>{(['NORMAL', 'IMPORTANT'] as const).map((option) => {
    const selected = value === option;
    const active = option === 'IMPORTANT' ? styles.priorityOptionActiveImportant : styles.priorityOptionActive;
    const text = option === 'IMPORTANT' ? styles.priorityTextActiveImportant : styles.priorityTextActive;
    return <ActionButton key={option} style={[styles.priorityOption, selected && active]} onPress={() => onChange(option)}
      accessibilityRole="button" accessibilityState={{ selected }}>
      <Label style={[styles.priorityText, selected && text]}>{option}</Label>
    </ActionButton>;
  })}</Box>;
}
