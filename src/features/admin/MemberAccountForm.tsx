import { ActionButton, Label } from '../../components/WebUI';
import { AdminForm, Field } from '../../components/MinistryComponents';
import { styles } from '../../theme';
import { MemberTeamSelect } from './MemberTeamSelect';
import type { useMemberManagement } from './useMemberManagement';

type Management = ReturnType<typeof useMemberManagement>;

export function MemberAccountForm({ management: m }: { management: Management }) {
  return <AdminForm title="Create a member account" icon="person-add-outline">
    <Label style={styles.adminHelp}>Accounts are created by the ministry admin. Give the member their sign-in details securely.</Label>
    <Field label="MEMBER FULL NAME" value={m.memberName} onChangeText={m.setMemberName} placeholder="Full name" autoCapitalize="words" />
    <Field label="MEMBER EMAIL" value={m.memberEmail} onChangeText={m.setMemberEmail} placeholder="member@example.com" keyboardType="email-address" autoCapitalize="none" />
    <Field label="TEMPORARY PASSWORD" value={m.memberPassword} onChangeText={m.setMemberPassword} placeholder="At least 8 characters" secureTextEntry />
    <MemberTeamSelect value={m.memberTeam} onChange={m.setMemberTeam} />
    <ActionButton style={styles.adminButton} onPress={m.createMember} disabled={m.busy}>
      <Label style={styles.adminButtonText}>{m.busy ? 'Creating account…' : 'Create member account'}</Label>
    </ActionButton>
  </AdminForm>;
}
