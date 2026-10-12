import { Box } from '../../components/WebUI';
import { Field } from '../../components/MinistryComponents';
import { styles } from '../../theme';
import type { EventDraft, EventFieldErrors } from './calendarTypes';
import { FieldValidationMessage } from './FieldValidationMessage';

type EventDetailsFieldsProps = {
  draft: EventDraft;
  errors: EventFieldErrors;
  update: <K extends keyof EventDraft>(key: K, value: EventDraft[K]) => void;
};

export function EventDetailsFields({ draft, errors, update }: EventDetailsFieldsProps) {
  return (
    <>
      <Field label="EVENT TITLE" value={draft.title} onChangeText={(value) => update('title', value)} placeholder="Sunday service" labelStyle={styles.calendarDarkFieldLabel} />
      <FieldValidationMessage message={errors.title} />
      <Field label="LOCATION" value={draft.location} onChangeText={(value) => update('location', value)} placeholder="Main sanctuary" labelStyle={styles.calendarDarkFieldLabel} />
      <FieldValidationMessage message={errors.location} />
      <Field label="DATE" type="date" value={draft.date} onChangeText={(value) => update('date', value)} placeholder="" labelStyle={styles.calendarDarkFieldLabel} />
      <FieldValidationMessage message={errors.date} />
      <Box style={styles.inlineFieldRow}>
        <Field label="START TIME" type="time" value={draft.startTime} onChangeText={(value) => update('startTime', value)} placeholder="" labelStyle={styles.calendarDarkFieldLabel} />
        <Field label="END TIME" type="time" value={draft.endTime} onChangeText={(value) => update('endTime', value)} placeholder="" labelStyle={styles.calendarDarkFieldLabel} />
      </Box>
      <FieldValidationMessage message={errors.startTime} />
      <FieldValidationMessage message={errors.endTime} />
    </>
  );
}
