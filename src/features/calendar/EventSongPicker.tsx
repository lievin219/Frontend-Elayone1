import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import type { SongItem } from '../../types';

type EventSongPickerProps = {
  songs: SongItem[];
  selectedSongIds: string[];
  onChange: (ids: string[]) => void;
};

export function EventSongPicker({ songs, selectedSongIds, onChange }: EventSongPickerProps) {
  const librarySongs = songs.filter((song): song is SongItem & { id: string } => Boolean(song.id));

  function toggleSong(songId: string) {
    const nextIds = selectedSongIds.includes(songId)
      ? selectedSongIds.filter((id) => id !== songId)
      : [...selectedSongIds, songId];
    onChange(nextIds);
  }

  return (
    <Box style={styles.inviteePicker}>
      <Label style={styles.inviteePickerCaption}>
        {selectedSongIds.length} song{selectedSongIds.length === 1 ? '' : 's'} selected · order follows your selections
      </Label>
      {librarySongs.length === 0
        ? <Label style={styles.adminHelp}>Add songs in Manage songs first, then attach them here.</Label>
        : librarySongs.map((song) => {
          const selected = selectedSongIds.includes(song.id);
          const order = selected ? selectedSongIds.indexOf(song.id) + 1 : null;
          return (
            <ActionButton key={song.id} style={styles.inviteeRow} onPress={() => toggleSong(song.id)} accessibilityRole="checkbox" accessibilityState={{ checked: selected }}>
              <Icon name={selected ? 'checkbox' : 'square-outline'} size={20} color={selected ? COLORS.olive : COLORS.muted} />
              <Box style={{ flex: 1 }}>
                <Label style={styles.inviteeName}>{order ? `${order}. ${song.title}` : song.title}</Label>
                <Label style={styles.inviteeMeta}>{song.status} · {song.key ?? 'No key'}</Label>
              </Box>
            </ActionButton>
          );
        })}
    </Box>
  );
}
