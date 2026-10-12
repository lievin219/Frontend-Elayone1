import { Box, Label } from '../components/WebUI';
import type { MinistryTeam, Role } from '../api';
import type { MinistryAvailability } from '../types';
import { styles } from '../theme';
import { ProfileAttendance } from './profile/ProfileAttendance';
import { ProfileOverview } from './profile/ProfileOverview';
import { ProfilePasswordForm } from './profile/ProfilePasswordForm';
import { getRoleName } from './ministryLabels';

type ProfileProps = {
  memberName: string;
  email: string;
  role: Role;
  team: MinistryTeam | null;
  availability: MinistryAvailability | null;
  memberUserId: string;
};

export function Profile({ memberName, email, role, team, availability, memberUserId }: ProfileProps) {
  return (
    <Box className="profile-page">
      <Label style={styles.pageEyebrow}>ELAYONE / PROFILE</Label>
      <Label style={styles.pageTitle}>Your profile</Label>
      <Label style={styles.pageCaption}>Your account, team, and attendance.</Label>
      <ProfileOverview
        memberName={memberName}
        email={email}
        roleLabel={getRoleName(role)}
        team={team}
        availability={availability}
      />
      <ProfileAttendance memberUserId={memberUserId} />
      <ProfilePasswordForm />
    </Box>
  );
}
