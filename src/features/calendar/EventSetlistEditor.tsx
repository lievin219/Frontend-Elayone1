import { ActionButton, Box, Label } from '../../components/WebUI';
import { EventSongPicker } from './EventSongPicker';
import type { CalendarEventCardProps } from './calendarTypes';
import { styles } from '../../theme';

type EventSetlistEditorProps = {
  songs: CalendarEventCardProps['songs'];
  selectedSongIds: string[];
  saving: boolean;
  error: string;
  onChange: (ids: string[]) => void;
  onCancel: () => void;
  onSave: () => void;
};

export function EventSetlistEditor(props: EventSetlistEditorProps) {
  return (
    <Box style={styles.eventSongEditor}>
      <EventSongPicker songs={props.songs} selectedSongIds={props.selectedSongIds} onChange={props.onChange} />
      {props.error && <Label style={styles.eventSongError}>{props.error}</Label>}
      <Box style={styles.eventSongActions}>
        <ActionButton style={styles.eventSongCancelButton} onPress={props.onCancel} disabled={props.saving}>
          <Label style={styles.eventSongManageText}>Cancel</Label>
        </ActionButton>
        <ActionButton style={styles.eventSongSaveButton} onPress={props.onSave} disabled={props.saving}>
          <Label style={styles.eventSongSaveText}>{props.saving ? 'Saving…' : 'Save setlist'}</Label>
        </ActionButton>
      </Box>
    </Box>
  );
}
