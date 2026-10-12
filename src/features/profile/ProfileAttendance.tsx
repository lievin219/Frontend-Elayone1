import { Box, Label } from '../../components/WebUI';
import { ProfileAttendanceContent, ProfileAttendanceRefreshButton } from './ProfileAttendancePanel';
import { useProfileAttendance } from './useProfileAttendance';

export function ProfileAttendance({ memberUserId }: { memberUserId: string }) {
  const attendanceState = useProfileAttendance(memberUserId);

  return (
    <Box className="profile-attendance">
      <Box className="profile-section-heading">
        <Box>
          <Label className="profile-section-kicker">SERVICE HISTORY</Label>
          <Label className="profile-section-title">Your attendance</Label>
        </Box>
        <ProfileAttendanceRefreshButton {...attendanceState} />
      </Box>
      <ProfileAttendanceContent {...attendanceState} />
    </Box>
  );
}
