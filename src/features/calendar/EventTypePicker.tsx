import { ActionButton, Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { EventType } from '../../api';
import { Field } from '../../components/MinistryComponents';
import type { EventFieldErrors } from './calendarTypes';
import { FieldValidationMessage } from './FieldValidationMessage';

type EventTypePickerProps = {
  eventType: EventType;
  customEventType: string;
  error?: EventFieldErrors['customEventType'];
  onTypeChange: (type: EventType) => void;
  onCustomTypeChange: (value: string) => void;
};

const eventTypes: EventType[] = ['SERVICE', 'REHEARSAL', 'WORSHIP_NIGHT', 'SPECIAL_EVENT', 'CUSTOM'];

export function EventTypePicker({ eventType, customEventType, error, onTypeChange, onCustomTypeChange }: EventTypePickerProps) {
  return (
    <>
      <Label style={[styles.fieldLabel, styles.calendarDarkFieldLabel, { marginBottom: 8 }]}>EVENT TYPE</Label>
      <Box style={styles.priorityRow}>
        {eventTypes.map((option) => <ActionButton key={option} style={[styles.priorityOption, eventType === option && styles.priorityOptionActive]} onPress={() => onTypeChange(option)} accessibilityRole="button" accessibilityState={{ selected: eventType === option }} accessibilityLabel={`Event type ${option.replace('_', ' ')}`}>
          <Label style={[styles.priorityText, eventType === option && styles.priorityTextActive]}>{option.replace('_', ' ')}</Label>
        </ActionButton>)}
      </Box>
      {eventType === 'CUSTOM' && <>
        <Field label="CUSTOM EVENT TYPE" value={customEventType} onChangeText={onCustomTypeChange} placeholder="Ministry retreat" labelStyle={styles.calendarDarkFieldLabel} />
        <FieldValidationMessage message={error} />
      </>}
    </>
  );
}
