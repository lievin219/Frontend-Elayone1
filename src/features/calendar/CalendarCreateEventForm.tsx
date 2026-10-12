import { ActionButton, Box, Label } from '../../components/WebUI';
import { EventSongPicker } from './EventSongPicker';
import { EventDetailsFields } from './EventDetailsFields';
import { EventTypePicker } from './EventTypePicker';
import { useEventCreation } from './useEventCreation';
import type { CalendarNotice } from './calendarTypes';
import type { SongItem } from '../../types';
import type { RehearsalRecord } from '../../api';
import { styles } from '../../theme';
import { FieldValidationMessage } from './FieldValidationMessage';

type CalendarCreateEventFormProps = {
  songs: SongItem[];
  onCreated: (event: RehearsalRecord) => void;
  onNotice: (notice: CalendarNotice) => void;
  onClose: () => void;
};

export function CalendarCreateEventForm({ songs, onCreated, onNotice, onClose }: CalendarCreateEventFormProps) {
  const form = useEventCreation(songs, onCreated, onNotice);
  async function saveEvent() {
    if (await form.submit()) onClose();
  }

  return (
    <Box className="calendar-create-form" style={[styles.calendarCreateForm, styles.calendarDarkCreateForm]}>
      <Label style={[styles.calendarCreateTitle, styles.calendarDarkCreateTitle]}>New ministry event</Label>
      <Label style={[styles.calendarCreateCaption, styles.calendarDarkCreateCaption]}>This event will be visible to the whole ministry.</Label>
      <EventDetailsFields draft={form.draft} errors={form.errors} update={form.updateDraft} />
      <EventTypePicker eventType={form.draft.eventType} customEventType={form.draft.customEventType} error={form.errors.customEventType} onTypeChange={(eventType) => form.updateDraft('eventType', eventType)} onCustomTypeChange={(value) => form.updateDraft('customEventType', value)} />
      <Label style={[styles.fieldLabel, styles.calendarDarkFieldLabel, { marginTop: 5, marginBottom: 8 }]}>SONGS FOR THIS EVENT</Label>
      <EventSongPicker songs={songs} selectedSongIds={form.draft.songIds} onChange={(songIds) => form.updateDraft('songIds', songIds)} />
      <ActionButton style={[styles.adminButton, styles.calendarDarkSaveButton]} onPress={saveEvent} disabled={form.creating}>
        <Label style={[styles.adminButtonText, styles.calendarDarkSaveButtonText]}>{form.creating ? 'Adding event...' : 'Save event'}</Label>
      </ActionButton>
    </Box>
  );
}
