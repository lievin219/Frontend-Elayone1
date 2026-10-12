import { useState } from 'react';
import { removeChoirMember, updateMemberTeam, updateUserRole } from '../../api';
import type { MinistryTeam } from '../../api';
import type { NoticeSetter, UserState } from './memberTypes';

const choirId = 'elayone-main-choir';

export function useMemberActions([, setUsers]: UserState, setNotice: NoticeSetter) {
  const [teamUpdatingUserId, setTeamUpdatingUserId] = useState<string | null>(null);
  async function changeRole(userId: string, nextRole: 'MEMBER' | 'LEADER' | 'ADMIN') {
    setNotice(null);
    try {
      const updated = await updateUserRole(userId, nextRole);
      setUsers((current) => current.map((user) => user.id === userId ? { ...user, role: updated.role } : user));
      setNotice({ type: 'success', text: `${updated.name} is now a ${updated.role}.` });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'Could not update this role right now.' });
    }
  }
  async function changeMemberTeam(userId: string, ministryTeam: MinistryTeam) {
    setTeamUpdatingUserId(userId);
    try {
      await updateMemberTeam(userId, choirId, ministryTeam);
      setUsers((current) => current.map((user) => user.id === userId ? { ...user, memberships: user.memberships.map((membership) => membership.choirId === choirId ? { ...membership, ministryTeam } : membership) } : user));
      setNotice({ type: 'success', text: 'Team updated.' });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'Could not update this team.' });
    } finally { setTeamUpdatingUserId(null); }
  }
  async function removeMember(userId: string) {
    setNotice(null);
    try {
      await removeChoirMember(choirId, userId);
      setUsers((current) => current.filter((user) => user.id !== userId));
      setNotice({ type: 'success', text: 'Member removed from this ministry.' });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'Could not remove this member.' });
    }
  }
  return { changeRole, changeMemberTeam, teamUpdatingUserId, removeMember };
}
