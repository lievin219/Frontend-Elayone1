import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api';
import type { NoticeSetter } from './memberTypes';
import { useMemberActions } from './useMemberActions';

export function useMemberDirectory(setNotice: NoticeSetter) {
  const [users, setUsers] = useState<Awaited<ReturnType<typeof getAllUsers>>>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');

  useEffect(() => {
    let active = true;
    getAllUsers().then((result) => {
      if (active) { setUsers(result); setUsersError(''); }
    }).catch((error) => {
      if (active) setUsersError(error instanceof Error ? error.message : 'Could not load user accounts.');
    }).finally(() => { if (active) setUsersLoading(false); });
    return () => { active = false; };
  }, []);

  async function refreshUsers() {
    setUsersLoading(true);
    setUsersError('');
    setNotice(null);
    try {
      setUsers(await getAllUsers());
      setNotice({ type: 'success', text: 'Member list is up to date.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'We could not refresh the member list. Please try again.';
      setUsersError(message);
      setNotice({ type: 'error', text: message });
    } finally { setUsersLoading(false); }
  }

  const actions = useMemberActions([users, setUsers], setNotice);
  function addUser(user: (typeof users)[number]) {
    setUsers((current) => [user, ...current]);
    setUsersError('');
  }
  return { users, usersLoading, usersError, refreshUsers, addUser, ...actions };
}
