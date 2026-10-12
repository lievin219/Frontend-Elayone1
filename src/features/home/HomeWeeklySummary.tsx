import { ActionButton, Box, Label } from '../../components/WebUI';
import type { AttendanceSummary } from '../../api';
import { COLORS, styles } from '../../theme';

type HomeWeeklySummaryProps = {
  upcomingRehearsalCount: number;
  attendanceSummary: AttendanceSummary;
  songCount: number;
  onOpenCalendar: () => void;
};

export function HomeWeeklySummary({
  upcomingRehearsalCount, attendanceSummary, songCount, onOpenCalendar,
}: HomeWeeklySummaryProps) {
  return (
    <>
      <Box className="home-section-header" style={styles.sectionHeader}>
        <Box>
          <Label style={styles.sectionTitle}>This week</Label>
          <Label style={styles.sectionCaption}>Your week at a glance</Label>
        </Box>
        <ActionButton onPress={onOpenCalendar}><Label style={styles.seeAll}>See all</Label></ActionButton>
      </Box>
      <Box className="home-week-grid" style={styles.weekGrid}>
        <WeeklyMetric number={String(upcomingRehearsalCount).padStart(2, '0')}
          label="UPCOMING EVENTS" foot="upcoming" />
        <WeeklyMetric number={String(attendanceSummary.rate)} label="ATTENDANCE"
          foot={`${attendanceSummary.total} responses`} color={COLORS.olive} percent />
        <WeeklyMetric number={String(songCount).padStart(2, '0')} label="SONGS"
          foot="in the library" color={COLORS.clay} />
      </Box>
    </>
  );
}

function WeeklyMetric({ number, label, foot, color, percent = false }: {
  number: string; label: string; foot: string; color?: string; percent?: boolean;
}) {
  return (
    <Box className="home-week-metric" style={styles.weekMetric}>
      <Label style={styles.metricNumber}>
        {number}{percent && <Label style={styles.metricPercent}>%</Label>}
      </Label>
      <Label style={styles.metricLabel}>{label}</Label>
      <Box style={[styles.metricRule, color ? { backgroundColor: color } : undefined]} />
      <Label style={styles.metricFoot}>{foot}</Label>
    </Box>
  );
}
