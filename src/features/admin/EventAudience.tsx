import { ActionButton, Box, Icon, Label, Spinner } from '../../components/WebUI';
import { styles, COLORS } from '../../theme';
import type { useMemberManagement } from './useMemberManagement';
import type { EventDraft, InviteMode } from './eventTypes';
import { InviteeList } from './InviteeList';

type Members = ReturnType<typeof useMemberManagement>;
const modes: { id: InviteMode; label: string }[] = [{ id: 'ALL', label: 'Whole ministry' }, { id: 'SELECTED', label: 'Choose members' }];

export function EventAudience({ draft: d, members }: { draft: EventDraft; members: Members }) {
  return <>
    <Label style={[styles.fieldLabel, { marginTop: 5, marginBottom: 8 }]}>WHO SHOULD RECEIVE THIS EVENT?</Label>
    <Box style={styles.priorityRow}>{modes.map((option) => <ActionButton key={option.id}
      style={[styles.priorityOption, d.inviteMode === option.id && styles.priorityOptionActive]}
      onPress={() => d.setInviteMode(option.id)} accessibilityRole="button"
      accessibilityState={{ selected: d.inviteMode === option.id }}>
      <Label style={[styles.priorityText, d.inviteMode === option.id && styles.priorityTextActive]}>{option.label}</Label>
    </ActionButton>)}</Box>
    {d.inviteMode === 'SELECTED' && <InviteeList draft={d} members={members} />}
  </>;
}
