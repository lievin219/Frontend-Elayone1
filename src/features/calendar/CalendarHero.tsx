import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { Rehearsal } from '../../types';
import { GoogleCalendarButton } from './GoogleCalendarButton';

type CalendarHeroProps = {
  nextEvent: Rehearsal | null;
  canManage: boolean;
  onShowEvent: (event: Rehearsal) => void;
};

export function CalendarHero({ nextEvent, canManage, onShowEvent }: CalendarHeroProps) {
  return (
    <Box className="calendar-hero" style={styles.calendarHero}>
      <Box className="calendar-hero-art" aria-hidden="true">
        <Icon name="musical-notes-outline" size={170} color="#ffffff" />
      </Box>
      <Box style={styles.calendarHeroTop}>
        <Box style={styles.calendarHeroMark}>
          <Icon name="cross-outline" size={21} color="#111111" />
          <Icon name="musical-notes-outline" size={20} color="#111111" />
        </Box>
        <Box style={styles.calendarHeroCopy}>
          <Label style={styles.calendarHeroEyebrow}>ELAYONE · GOSPEL MUSIC MINISTRY</Label>
          <Label style={styles.calendarHeroTitle}>Upcoming events</Label>
          <Label style={styles.calendarHeroCaption}>See what’s coming up and what to prepare.</Label>
        </Box>
      </Box>
      <NextGathering event={nextEvent} canManage={canManage} onShowEvent={onShowEvent} />
    </Box>
  );
}

type NextGatheringProps = Omit<CalendarHeroProps, 'nextEvent'> & { event: Rehearsal | null };

function NextGathering({ event, canManage, onShowEvent }: NextGatheringProps) {
  return (
    <Box style={styles.calendarHeroNext}>
      <Label style={styles.calendarHeroNextLabel}>{event ? 'NEXT EVENT' : 'NO UPCOMING EVENT'}</Label>
      <Label style={styles.calendarHeroNextTitle}>{event?.title ?? 'No gathering scheduled yet'}</Label>
      <Label style={styles.calendarHeroNextMeta}>
        {event ? `${new Date(event.startsAt).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} · ${new Date(event.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · ${event.location}` : canManage ? 'Add an event so everyone knows what is next.' : 'Your next event will appear here.'}
      </Label>
      {event && <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <ActionButton style={styles.calendarHeroAction} onPress={() => onShowEvent(event)}>
          <Label style={styles.calendarHeroActionText}>View on calendar</Label>
          <Icon name="arrow-forward" size={14} color="#ffffff" />
        </ActionButton>
        <GoogleCalendarButton event={event} />
      </Box>}
    </Box>
  );
}
