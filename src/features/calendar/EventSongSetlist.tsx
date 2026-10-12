import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';

type SetlistSong = { id: string; title: string; key?: string | null };

export function EventSongSetlist({ songs }: { songs?: SetlistSong[] }) {
  if (!songs?.length) return null;
  return (
    <Box style={styles.eventSongList}>
      <Label style={styles.eventSongListLabel}>{songs.length} songs for this event</Label>
      {songs.map((song, index) => (
        <Label key={song.id} style={styles.eventSongItem}>
          {index + 1}. {song.title}{song.key ? ` · ${song.key}` : ''}
        </Label>
      ))}
    </Box>
  );
}
