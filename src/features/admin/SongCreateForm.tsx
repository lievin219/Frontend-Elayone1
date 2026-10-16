import { useRef } from 'react';
import { ActionButton, Icon, Label } from '../../components/WebUI';
import { Field } from '../../components/MinistryComponents';
import { COLORS, styles } from '../../theme';
import type { SongItem } from '../../types';
import type { BusyState, NoticeSetter } from './adminTypes';
import { useAdminSongForm } from './useAdminSongForm';

type Props = { onAdded: (song: SongItem) => void; setNotice: NoticeSetter; busy: BusyState[0]; setBusy: BusyState[1] };

export function SongCreateForm(props: Props) {
  const input = useRef<HTMLInputElement>(null);
  const form = useAdminSongForm(props.onAdded, props.setNotice, props.setBusy);
  return <>
    <Label style={styles.adminFormSubheading}>Add a new song</Label>
    <Label className="song-create-help">Audio is optional. Save the song details now and add a preview link or audio file whenever one is available.</Label>
    <Field label="SONG TITLE" value={form.title} onChangeText={form.setTitle} placeholder="Elayone Music only" />
    <Field label="KEY" value={form.key} onChangeText={form.setKey} placeholder="Praise or Worship" />
    <input ref={input} type="file" accept="audio/mpeg,audio/mp3,video/mp4,audio/mp4" hidden onChange={(e) => {
      const file = e.currentTarget.files?.[0];
      if (file) { form.setMedia(file); form.setPreview(''); props.setNotice(null); }
    }} />
    <ActionButton style={styles.uploadButton} onPress={() => input.current?.click()} disabled={props.busy}>
      <Icon name="cloud-upload-outline" size={17} color={COLORS.ink} />
      <Label style={styles.uploadButtonText}>{form.media ? 'Choose a different media file' : 'Attach MP3 or MP4 (optional)'}</Label>
    </ActionButton>
    {form.media && <Label style={styles.uploadFileName}>{form.media.name}</Label>}
    <Field label="PREVIEW URL (OPTIONAL)" value={form.previewUrl} onChangeText={form.setPreview} placeholder="https://example.com/song.mp3" />
    <Field label="NOTES" value={form.notes} onChangeText={form.setNotes} placeholder="Add singing notes or rehearsal tips" multiline />
    <ActionButton style={styles.adminButton} onPress={form.addSong} disabled={props.busy}>
      <Label style={styles.adminButtonText}>{props.busy ? 'Saving...' : 'Add song'}</Label>
    </ActionButton>
  </>;
}
