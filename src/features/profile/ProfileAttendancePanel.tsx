import { ActionButton, Box, Icon, Label, Spinner } from '../../components/WebUI';
import type { MemberAttendance } from './useProfileAttendance';
import { ProfileAttendanceStats } from './ProfileAttendanceStats';

type AttendancePanelProps = {
  attendance: MemberAttendance | null;
  loading: boolean;
  error: string;
  reload: () => void;
};

export function ProfileAttendanceRefreshButton({ loading, reload }: Pick<AttendancePanelProps, 'loading' | 'reload'>) {
  return (
    <ActionButton className="profile-refresh" onPress={reload} disabled={loading} accessibilityLabel="Refresh attendance">
      <Icon name="refresh-outline" size={17} color="#eeeeee" />
    </ActionButton>
  );
}

export function ProfileAttendanceContent({ attendance, loading, error, reload }: AttendancePanelProps) {
  if (loading) return <AttendanceMessage loading>Loading attendance…</AttendanceMessage>;
  if (error) return <AttendanceMessage onRetry={reload}>{error}</AttendanceMessage>;
  if (!attendance) return <AttendanceMessage>No attendance history is available yet.</AttendanceMessage>;
  return <ProfileAttendanceStats attendance={attendance} />;
}

function AttendanceMessage({ children, loading, onRetry }: { children: string; loading?: boolean; onRetry?: () => void }) {
  return (
    <Box className={`profile-attendance-state${onRetry ? ' profile-attendance-error' : ''}`}>
      {loading && <Spinner color="#eeeeee" />}
      <Label>{children}</Label>
      {onRetry && <ActionButton onPress={onRetry}><Label>Try again</Label></ActionButton>}
    </Box>
  );
}
