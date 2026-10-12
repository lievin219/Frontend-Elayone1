import { ActionButton, Box, Icon, Label, Spinner } from '../../components/WebUI';
import { AdminForm } from '../../components/MinistryComponents';
import { COLORS, styles } from '../../theme';
import type { useMemberManagement } from './useMemberManagement';
import { MemberRow } from './MemberRow';

type Management = ReturnType<typeof useMemberManagement>;

export function MemberDirectory({ management }: { management: Management }) {
  const { users, usersLoading, usersError, refreshUsers } = management;
  return <AdminForm title="All registered users" icon="people-circle-outline">
    <Box style={styles.directoryHeader}>
      <Label style={styles.directoryCount}>{users.length}</Label><Label style={styles.directoryLabel}>accounts</Label>
      <ActionButton onPress={refreshUsers} accessibilityLabel="Refresh member list">
        <Icon name="refresh-outline" size={19} color={COLORS.ink} />
      </ActionButton>
    </Box>
    {usersLoading ? <Spinner color={COLORS.ink} /> : usersError ? <Box style={styles.userLoadError}>
      <Label style={styles.userLoadErrorText}>{usersError}</Label>
      <ActionButton style={styles.smallActionButton} onPress={refreshUsers} disabled={usersLoading}>
        <Label style={styles.smallActionText}>{usersLoading ? 'Loading...' : 'Try again'}</Label>
      </ActionButton>
    </Box> : users.length === 0 ? <Label style={styles.adminHelp}>No registered users yet.</Label> :
      users.map((user) => <MemberRow key={user.id} user={user} management={management} />)}
  </AdminForm>;
}
