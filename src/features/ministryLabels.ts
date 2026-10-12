import type { MinistryTeam, Role } from '../api';

const teamNames: Record<MinistryTeam, string> = {
  SINGERS: 'Singers',
  BAND: 'Band',
};

const roleNames: Record<Role, string> = {
  ADMIN: 'Administrator',
  LEADER: 'Leader',
  MEMBER: 'Member',
};

export function getTeamName(team: MinistryTeam | null) {
  return team ? teamNames[team] : 'Not assigned';
}

export function getRoleName(role: Role) {
  return roleNames[role];
}
