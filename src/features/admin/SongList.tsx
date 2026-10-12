import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { deleteSong } from '../../api';
import { COLORS, styles } from '../../theme';
import type { SongItem } from '../../types';
import type { NoticeSetter } from './adminTypes';

const choirId = 'elayone-main-choir';

export function SongList({ songs, onDeleted, setNotice }: { songs: SongItem[]; onDeleted: (id: string) => void; setNotice: NoticeSetter }) {
  if (!songs.length) return <Label style={styles.adminHelp}>No songs have been added yet.</Label>;
  return <>{songs.map((song) => <Box key={song.id ?? song.title} style={styles.adminSongRow}>
    <Box style={{ flex: 1 }}><Label style={styles.adminAnnouncementTitle}>{song.title}</Label>
      <Label style={styles.adminAnnouncementMeta}>{song.status} · {song.key ?? 'No key'}</Label></Box>
    {song.id && <ActionButton style={styles.removeIconButton} onPress={() => removeSong(song, onDeleted, setNotice)} accessibilityLabel={`Delete ${song.title}`}>
      <Icon name="trash-outline" size={17} color={COLORS.clay} />
    </ActionButton>}
  </Box>)}</>;
}

async function removeSong(song: SongItem, onDeleted: (id: string) => void, setNotice: NoticeSetter) {
  if (!song.id) return;
  try {
    await deleteSong(choirId, song.id);
    onDeleted(song.id);
    setNotice({ type: 'success', text: `${song.title} was removed from the song library.` });
  } catch (error) {
    setNotice({ type: 'error', text: error instanceof Error ? error.message : 'Could not remove this song.' });
  }
}
