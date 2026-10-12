import { ActionButton, Box, Icon, Label, Spinner } from '../../components/WebUI';
import { COLORS, styles } from '../../theme';
import type { useMemberManagement } from './useMemberManagement';
import type { EventDraft } from './eventTypes';
import { getTeamName } from '../ministryLabels';

type Members = ReturnType<typeof useMemberManagement>;
const choirId = 'elayone-main-choir';

export function InviteeList({ draft: d, members }: { draft: EventDraft; members: Members }) {
  const choirMembers = members.users.filter((user) => user.memberships.some((membership) => membership.choirId === choirId));
  return <Box style={styles.inviteePicker}>
    <Label style={styles.inviteePickerCaption}>{d.selectedInviteeIds.length} selected · only selected members will see and respond to this invitation</Label>
    {members.usersLoading ? <Spinner color={COLORS.ink} /> : choirMembers.length === 0 ?
      <Label style={styles.adminHelp}>No ministry members are available to invite yet.</Label> :
      choirMembers.map((member) => <InviteeRow key={member.id} user={member} draft={d} />)}
  </Box>;
}

function InviteeRow({ user, draft: d }: { user: Members['users'][number]; draft: EventDraft }) {
  const selected = d.selectedInviteeIds.includes(user.id);
  const team = user.memberships.find((membership) => membership.choirId === choirId)?.ministryTeam ?? null;
  const toggle = () => d.setSelectedInviteeIds((current) => selected ? current.filter((id) => id !== user.id) : [...current, user.id]);
  return <ActionButton style={styles.inviteeRow} onPress={toggle} accessibilityRole="checkbox" accessibilityState={{ checked: selected }}>
    <Icon name={selected ? 'checkbox' : 'square-outline'} size={20} color={selected ? COLORS.olive : COLORS.muted} />
    <Box style={{ flex: 1 }}><Label style={styles.inviteeName}>{user.name}</Label><Label style={styles.inviteeMeta}>{getTeamName(team)} · {user.email}</Label></Box>
  </ActionButton>;
}
