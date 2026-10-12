import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import type { Rehearsal } from '../../types';
import type { HomeDashboardProps } from './types';
type HomeNextEventCardProps = Pick<HomeDashboardProps,
  'nextRehearsal' | 'liveEventLabel' | 'liveEventState' | 'eventTypeLabel' |
  'nextRehearsalParts' | 'isCompact'
> & { onOpenCalendar: () => void };

export function HomeNextEventCard({
  nextRehearsal, liveEventLabel, liveEventState, eventTypeLabel,
  nextRehearsalParts, isCompact, onOpenCalendar,
}: HomeNextEventCardProps) {
  return (
    <Box className="home-next-card" style={[
      styles.nextRehearsalCard, isCompact && styles.mobileRehearsalCard,
    ]}>
      <Box style={styles.cardTopLine}>
        <Label style={styles.cardEyebrow}>{liveEventLabel}</Label>
        <Box style={styles.livePill}>
          <Box style={styles.liveDot} />
          <Label style={styles.liveText}>{liveEventState}</Label>
        </Box>
      </Box>
      <Label style={styles.rehearsalTitle}>{nextRehearsal?.title ?? 'No upcoming events'}</Label>
      <Label style={[styles.cardEyebrow, { marginTop: 8, marginBottom: 0 }]}>
        {eventTypeLabel}
      </Label>
      {nextRehearsal?.songs && nextRehearsal.songs.length > 0 && (
        <Label style={styles.eventSongSummary}>
          {nextRehearsal.songs.length} song{nextRehearsal.songs.length === 1 ? '' : 's'} ·{' '}
          {nextRehearsal.songs.map((song) => song.title).join(' · ')}
        </Label>
      )}
      <EventDetails rehearsal={nextRehearsal} start={nextRehearsalParts?.start} />
      <EventFooter rehearsal={nextRehearsal} onOpenCalendar={onOpenCalendar} />
    </Box>
  );
}
function EventDetails({ rehearsal, start }: { rehearsal: Rehearsal | null; start?: string }) {
  return (
    <Box style={styles.detailRow}>
      <Icon name="time-outline" size={16} color={COLORS.muted} />
      <Label style={styles.detailText}>{rehearsal ? `${start ?? ''} - ${new Date(
        rehearsal.endsAt,
      ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Add an event'}</Label>
      <Icon name="location-outline" size={16} color={COLORS.muted} style={styles.detailIcon} />
      <Label style={styles.detailText}>{rehearsal?.location ?? 'No location yet'}</Label>
    </Box>
  );
}
function EventFooter({ rehearsal, onOpenCalendar }: {
  rehearsal: Rehearsal | null; onOpenCalendar: () => void;
}) {
  const confirmed = rehearsal?.attendances?.filter(({ status }) => status === 'YES').length ?? 0;
  return (
    <Box style={styles.cardFooter}>
      <Label style={styles.attendanceText}>{confirmed} confirmed for this event</Label>
      <ActionButton style={styles.checkInButton} onPress={onOpenCalendar}>
        <Label style={styles.checkInText}>Open calendar</Label>
        <Icon name="arrow-forward" size={15} color={COLORS.white} />
      </ActionButton>
    </Box>
  );
}
