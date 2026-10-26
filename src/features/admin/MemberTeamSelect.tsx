import { ActionButton, Box, Icon, Label } from '../../components/WebUI';
import type { MinistryTeam } from '../../api';

type MemberTeamSelectProps = {
  value: MinistryTeam;
  onChange: (team: MinistryTeam) => void;
  label?: string;
  disabled?: boolean;
  presentation?: 'select' | 'switch';
};

export function MemberTeamSelect({ value, onChange, label = 'TEAM', disabled = false, presentation = 'select' }: MemberTeamSelectProps) {
  if (presentation === 'select') {
    return (
      <Box className="member-team-field">
        <Label className="field-label">{label}</Label>
        <select
          className="member-team-select"
          aria-label={label}
          value={value}
          disabled={disabled}
          onChange={(event) => {
            if (event.currentTarget.value === 'SINGERS' || event.currentTarget.value === 'BAND') {
              onChange(event.currentTarget.value);
            }
          }}
        >
          <option value="SINGERS">Singers</option>
          <option value="BAND">Band</option>
        </select>
      </Box>
    );
  }

  return (
    <Box className={`member-team-field member-team-${value.toLowerCase()}`}>
      <Box className="member-team-control-heading">
        <Label className="field-label">MINISTRY TEAM</Label>
        <Label className="member-team-control-hint">Choose this person’s team</Label>
      </Box>
      <Box className="member-team-switch" accessibilityRole="radiogroup" accessibilityLabel={label}>
        <ActionButton
          className={`member-team-option member-team-option-singers${value === 'SINGERS' ? ' is-active' : ''}`}
          onPress={() => onChange('SINGERS')}
          disabled={disabled || value === 'SINGERS'}
          accessibilityRole="radio"
          accessibilityState={{ checked: value === 'SINGERS', disabled: disabled || value === 'SINGERS' }}
          accessibilityLabel={`Set ${label} to Singers`}
        >
          <Icon name="musical-notes-outline" size={15} color={value === 'SINGERS' ? '#426d4a' : '#748074'} />
          <Label>Singers</Label>
        </ActionButton>
        <ActionButton
          className={`member-team-option member-team-option-band${value === 'BAND' ? ' is-active' : ''}`}
          onPress={() => onChange('BAND')}
          disabled={disabled || value === 'BAND'}
          accessibilityRole="radio"
          accessibilityState={{ checked: value === 'BAND', disabled: disabled || value === 'BAND' }}
          accessibilityLabel={`Set ${label} to Band`}
        >
          <Icon name="audio-lines-outline" size={15} color={value === 'BAND' ? '#376c83' : '#748074'} />
          <Label>Band</Label>
        </ActionButton>
      </Box>
    </Box>
  );
}
