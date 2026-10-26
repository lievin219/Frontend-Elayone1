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
  const initials = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  return <Box className={`admin-member-card admin-member-${user.role.toLowerCase()}`} style={styles.directoryRow}>
    <Box className={`admin-member-avatar admin-member-avatar-${user.role.toLowerCase()}`}><Label>{initials || '?'}</Label></Box>
    <Box className="admin-member-info" style={styles.personInfo}>
      <Box className="admin-member-heading">
        <Label className="admin-member-name" style={styles.personName}>{user.name}</Label>
        <Label className={`admin-role-badge admin-role-badge-${user.role.toLowerCase()}`}>{getRoleName(user.role)}</Label>
        {team && <Label className={`admin-team-badge admin-team-badge-${(team.ministryTeam ?? 'SINGERS').toLowerCase()}`}>
          {team.ministryTeam === 'BAND' ? 'BAND' : 'SINGERS'}
        </Label>}
      </Box>
      <Label className="admin-member-email" style={styles.personRole}>{user.email}</Label>
      <Label className="admin-member-meta" style={styles.directoryMeta}>{team ? 'Elayone Music Ministry' : `${user.memberships.length} ministry membership${user.memberships.length === 1 ? '' : 's'}`}</Label>
      {team && <MemberTeamSelect presentation="switch" label={`${user.name}'s team`} value={team.ministryTeam ?? 'SINGERS'} onChange={(v) => m.changeMemberTeam(user.id, v)} disabled={m.teamUpdatingUserId === user.id} />}
      {m.resetUserId === user.id && <Box className="admin-password-reset" style={styles.resetPasswordBox}>
        <Box className="admin-password-reset-heading">
          <Box className="admin-password-reset-icon"><Icon name="key-outline" size={15} color="#d8bd83" /></Box>
          <Box>
            <Label className="admin-password-reset-title">Set a new password</Label>
            <Label className="admin-password-reset-hint">Use at least 8 characters</Label>
          </Box>
        </Box>
        <TextField value={m.resetPassword} onChangeText={m.setResetPassword} placeholder="New password (8+ characters)" placeholderTextColor={COLORS.muted} secureTextEntry style={styles.resetPasswordInput} />
        <Box className="admin-password-reset-actions" style={styles.resetPasswordActions}>
          <ActionButton className="admin-password-cancel" onPress={() => { m.setResetUserId(null); m.setResetPassword(''); }}><Label>Cancel</Label></ActionButton>
          <ActionButton className="admin-password-save" onPress={() => m.resetPasswordForUser(user)} disabled={m.busy}><Icon name="checkmark-circle" size={15} color="#10271e" /><Label>{m.busy ? 'Saving...' : 'Save new password'}</Label></ActionButton>
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
  return <Box className="admin-member-actions" style={styles.roleActions}>
    <Label className="admin-member-actions-label">ACCOUNT ACTIONS</Label>
    {user.role !== 'ADMIN' && <ActionButton className="admin-role-promote" style={styles.smallActionButton} onPress={() => m.changeRole(user.id, 'ADMIN')}><Icon name="shield-checkmark-outline" size={15} color="#293b66" /><Label>Make admin</Label></ActionButton>}
    {!protectedAdmin && user.role !== 'MEMBER' && <ActionButton className="admin-role-demote" style={styles.smallSecondaryActionButton} onPress={() => m.changeRole(user.id, 'MEMBER')}><Icon name="person-outline" size={15} color="#526c84" /><Label>Set as member</Label></ActionButton>}
    {!protectedAdmin && <ActionButton className="admin-member-remove" style={styles.removeIconButton} onPress={() => m.removeMember(user.id)} accessibilityLabel={`Remove ${user.name}`}><Icon name="person-remove-outline" size={17} color={COLORS.clay} /><Label>Remove</Label></ActionButton>}
    <ActionButton className="admin-password-toggle" style={styles.smallSecondaryActionButton} onPress={() => { m.setResetUserId(m.resetUserId === user.id ? null : user.id); m.setResetPassword(''); }}>
      <Icon name="key-outline" size={15} color="#855a25" />
      <Label>{m.resetUserId === user.id ? 'Close password reset' : 'Reset password'}</Label>
    </ActionButton>
  </Box>;
}
