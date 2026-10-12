import { Box, Label } from '../../components/WebUI';
import type { MemberAttendance } from './useProfileAttendance';

export function ProfileAttendanceStats({ attendance }: { attendance: MemberAttendance }) {
  return (
    <Box className="profile-attendance-grid">
      <AttendanceStat value={`${attendance.stats.responseRate}%`} label="RESPONSE RATE" />
      <AttendanceStat value={String(attendance.stats.yes)} label="AVAILABLE" />
      <AttendanceStat value={String(attendance.stats.maybe)} label="MAYBE" />
      <AttendanceStat value={String(attendance.stats.no)} label="UNAVAILABLE" />
      <AttendanceStat value={String(attendance.stats.pending)} label="NO RESPONSE" />
    </Box>
  );
}

function AttendanceStat({ value, label }: { value: string; label: string }) {
  return (
    <Box className="profile-attendance-stat">
      <Label className="profile-attendance-value">{value}</Label>
      <Label className="profile-attendance-label">{label}</Label>
    </Box>
  );
}
