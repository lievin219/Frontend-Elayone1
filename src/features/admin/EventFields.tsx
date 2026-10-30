import { Box, Label } from '../../components/WebUI';
import { Field } from '../../components/MinistryComponents';
import { styles } from '../../theme';
import { EventTypeOptions } from './EventTypeOptions';
import { RecurrenceOptions } from './RecurrenceOptions';
import type { EventDraft } from './eventTypes';

export function EventFields({ draft: d }: { draft: EventDraft }) {
  return <>
    <Field label="EVENT TITLE" value={d.eventTitle} onChangeText={d.setEventTitle} placeholder="Sunday service set" />
    <Field label="LOCATION" value={d.eventLocation} onChangeText={d.setEventLocation} placeholder="Main sanctuary" />
    <Box style={styles.inlineFieldRow}><Field label="DATE (YYYY-MM-DD OR YYYYMMDD)" value={d.eventDate} onChangeText={d.setEventDate} placeholder="2026-12-19 or 20261219" /></Box>
    <Box style={styles.inlineFieldRow}>
      <Field label="START TIME" value={d.eventStartTime} onChangeText={d.setEventStartTime} placeholder="18:00" />
      <Field label="END TIME" value={d.eventEndTime} onChangeText={d.setEventEndTime} placeholder="20:00" />
    </Box>
    <EventTypeOptions draft={d} />
    {d.eventType === 'CUSTOM' && <Field label="CUSTOM EVENT TYPE" value={d.customEventType} onChangeText={d.setCustomEventType} placeholder="Ministry retreat" />}
    <Label style={[styles.fieldLabel, { marginTop: 5, marginBottom: 8 }]}>REPEAT EVENT</Label>
    <RecurrenceOptions draft={d} />
    {d.recurrenceFrequency !== 'NONE' && <Field label="NUMBER OF OCCURRENCES (1-52)" value={d.recurrenceCount} onChangeText={d.setRecurrenceCount} placeholder="4" keyboardType="number-pad" />}
  </>;
}
