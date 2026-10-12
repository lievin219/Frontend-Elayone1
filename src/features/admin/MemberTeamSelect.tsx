import { Box, Label } from '../../components/WebUI';
import type { MinistryTeam } from '../../api';

type MemberTeamSelectProps = {
  value: MinistryTeam;
  onChange: (team: MinistryTeam) => void;
  label?: string;
  disabled?: boolean;
};

export function MemberTeamSelect({ value, onChange, label = 'TEAM', disabled = false }: MemberTeamSelectProps) {
  function updateTeam(nextValue: string) {
    if (nextValue === 'SINGERS' || nextValue === 'BAND') onChange(nextValue);
  }

  return (
    <Box className="member-team-field">
      <Label className="field-label">{label}</Label>
      <select
        className="member-team-select"
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(event) => updateTeam(event.currentTarget.value)}
      >
        <option value="SINGERS">Singers</option>
        <option value="BAND">Band</option>
      </select>
    </Box>
  );
}
