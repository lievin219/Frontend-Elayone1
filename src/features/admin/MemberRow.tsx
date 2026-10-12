import { ActionButton, Box, Icon, Label, TextField } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import { getRoleName } from '../ministryLabels';
import { MemberTeamSelect } from './MemberTeamSelect';
import type { useMemberManagement } from './useMemberManagement';

type Management = ReturnType<typeof useMemberManagement>;
type User = Management['users'][number];

export function MemberRow({ user, management: m }: { user: User; management: Management }) {
  const protectedAdmin = user.role === 'ADMIN';
  const team = user.memberships.find((membership) => membership.choirId === 'elayone-main-choir');
  return <Box style={styles.directoryRow}>
    <Box style={styles.directoryAvatar}><Label style={styles.directoryInitial}>{user.name.slice(0, 1).toUpperCase()}</Label></Box>
    <Box style={styles.personInfo}>
      <Label style={styles.personName}>{user.name}</Label><Label style={styles.personRole}>{user.email}</Label>
      <Label style={styles.directoryMeta}>{getRoleName(user.role)} · {user.memberships.length} ministry membership{user.memberships.length === 1 ? '' : 's'}</Label>
      {team && <MemberTeamSelect label={`${user.name}'s team`} value={team.ministryTeam ?? 'SINGERS'} onChange={(v) => m.changeMemberTeam(user.id, v)} disabled={m.teamUpdatingUserId === user.id} />}
      {m.resetUserId === user.id && <Box style={styles.resetPasswordBox}>
        <TextField value={m.resetPassword} onChangeText={m.setResetPassword} placeholder="New password (8+ characters)" placeholderTextColor={COLORS.muted} secureTextEntry style={styles.resetPasswordInput} />
        <Box style={styles.resetPasswordActions}>
          <ActionButton onPress={() => { m.setResetUserId(null); m.setResetPassword(''); }}><Label style={styles.smallSecondaryActionText}>Cancel</Label></ActionButton>
          <ActionButton style={styles.smallActionButton} onPress={() => m.resetPasswordForUser(user)} disabled={m.busy}><Label style={styles.smallActionText}>{m.busy ? 'Saving...' : 'Save password'}</Label></ActionButton>
        </Box>
      </Box>}
    </Box>
    <MemberRoleActions user={user} management={m} protectedAdmin={protectedAdmin} />
  </Box>;
}

function MemberRoleActions({ user, management: m, protectedAdmin }: {
  user: User;
  management: Management;
  protectedAdmin: boolean;
}) {
  return <Box style={styles.roleActions}>
    {user.role !== 'ADMIN' && <ActionButton style={styles.smallActionButton} onPress={() => m.changeRole(user.id, 'ADMIN')}><Label style={styles.smallActionText}>Make admin</Label></ActionButton>}
    {!protectedAdmin && user.role !== 'MEMBER' && <ActionButton style={styles.smallSecondaryActionButton} onPress={() => m.changeRole(user.id, 'MEMBER')}><Label style={styles.smallSecondaryActionText}>Member</Label></ActionButton>}
    {!protectedAdmin && <ActionButton style={styles.removeIconButton} onPress={() => m.removeMember(user.id)} accessibilityLabel={`Remove ${user.name}`}><Icon name="person-remove-outline" size={17} color={COLORS.clay} /></ActionButton>}
    <ActionButton style={styles.smallSecondaryActionButton} onPress={() => { m.setResetUserId(m.resetUserId === user.id ? null : user.id); m.setResetPassword(''); }}>
      <Label style={styles.smallSecondaryActionText}>{m.resetUserId === user.id ? 'Close reset' : 'Reset password'}</Label>
    </ActionButton>
  </Box>;
}
