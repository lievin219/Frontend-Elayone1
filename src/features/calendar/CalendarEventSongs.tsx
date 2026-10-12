import { ActionButton, Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { CalendarEventCardProps } from './calendarTypes';
import { EventSetlistEditor } from './EventSetlistEditor';
import { useEventSetlist } from './useEventSetlist';

export function CalendarEventSongs({ event, songs, canManage, onSaveSongs }: Pick<CalendarEventCardProps, 'event' | 'songs' | 'canManage' | 'onSaveSongs'>) {
  const setlist = useEventSetlist(event, onSaveSongs);
  const toggleEditor = () => {
    setlist.setEditing((editing) => !editing);
    setlist.setError('');
  };
  return (
    <Box style={[styles.eventSongList, styles.calendarDarkEventSongs]}>
      <Box style={styles.eventSongHeader}>
        <Label style={[styles.eventSongListLabel, styles.calendarDarkEventSongLabel]}>
          {event.songs?.length ? `${event.songs.length} songs for this event` : 'Event setlist'}
        </Label>
        {canManage && <ActionButton style={styles.eventSongManageButton} onPress={toggleEditor}>
          <Label style={styles.eventSongManageText}>{setlist.editing ? 'Close' : event.songs?.length ? 'Edit setlist' : 'Add songs'}</Label>
        </ActionButton>}
      </Box>
      <EventSongRows event={event} canManage={canManage} />
      {setlist.editing && <EventSetlistEditor songs={songs} selectedSongIds={setlist.songIds} saving={setlist.saving} error={setlist.error} onChange={setlist.setSongIds} onCancel={setlist.cancel} onSave={setlist.save} />}
    </Box>
  );
}

function EventSongRows({ event, canManage }: Pick<CalendarEventCardProps, 'event' | 'canManage'>) {
  if (!event.songs?.length) {
    return <Label style={styles.eventSongEmpty}>{canManage ? 'No songs yet. Add music so ministry members can prepare.' : 'The music for this event has not been posted yet.'}</Label>;
  }
  return <Box>{event.songs.map((song, index) => <Label key={song.id} style={[styles.eventSongItem, styles.calendarDarkEventSongItem]}>{index + 1}. {song.title}{song.key ? ` · ${song.key}` : ''}</Label>)}</Box>;
}
