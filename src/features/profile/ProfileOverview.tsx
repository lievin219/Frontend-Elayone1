import { Box, Label } from '../../components/WebUI';
import type { MinistryTeam } from '../../api';
import type { MinistryAvailability } from '../../types';
import { getTeamName } from '../ministryLabels';

type ProfileOverviewProps = {
  memberName: string;
  email: string;
  roleLabel: string;
  team: MinistryTeam | null;
  availability: MinistryAvailability | null;
};

const availabilityLabels: Record<MinistryAvailability, string> = {
  YES: 'Available',
  MAYBE: 'Maybe',
  NO: 'Unavailable',
  PENDING: 'No response yet',
};

export function ProfileOverview({ memberName, email, roleLabel, team, availability }: ProfileOverviewProps) {
  return (
    <Box className="profile-overview">
      <Box className="profile-overview-heading">
        <Box className="profile-avatar">
          <Label>{memberName.trim().slice(0, 1).toUpperCase()}</Label>
        </Box>
        <Box className="profile-account">
          <Label className="profile-name">{memberName}</Label>
          <Label className="profile-email">{email}</Label>
        </Box>
      </Box>
      <Box className="profile-details">
        <ProfileDetail label="MINISTRY ROLE" value={roleLabel} />
        <ProfileDetail label="TEAM" value={getTeamName(team)} />
        <ProfileDetail label="AVAILABILITY" value={availability ? availabilityLabels[availability] : 'Not set'} />
      </Box>
    </Box>
  );
}

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <Box className="profile-detail">
      <Label className="profile-detail-label">{label}</Label>
      <Label className="profile-detail-value">{value}</Label>
    </Box>
  );
}
