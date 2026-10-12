import { useState } from 'react';
import { createMemberAccount } from '../../api';
import type { MinistryTeam } from '../../api';
import type { BusyState, NoticeSetter } from './memberTypes';
import type { useMemberDirectory } from './useMemberDirectory';

type Directory = ReturnType<typeof useMemberDirectory>;

export function useMemberAccount(directory: Directory, setNotice: NoticeSetter, setBusy: BusyState[1]) {
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPassword, setMemberPassword] = useState('');
  const [memberTeam, setMemberTeam] = useState<MinistryTeam>('SINGERS');

  async function createMember() {
    if (memberName.trim().length < 2) return setNotice({ type: 'error', text: 'Please enter the member’s full name (at least 2 characters).' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail.trim())) return setNotice({ type: 'error', text: 'Please enter a valid email address for the member.' });
    if (memberPassword.length < 8) return setNotice({ type: 'error', text: 'The temporary password must be at least 8 characters.' });
    setBusy(true);
    setNotice(null);
    try {
      const user = await createMemberAccount({ name: memberName.trim(), email: memberEmail.trim(), password: memberPassword, ministryTeam: memberTeam });
      directory.addUser(user);
      setMemberName(''); setMemberEmail(''); setMemberPassword(''); setMemberTeam('SINGERS');
      setNotice({ type: 'success', text: `Account created for ${user.name}. Share the temporary password with them securely.` });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'We could not create the account. Please try again.' });
    } finally { setBusy(false); }
  }
  return { memberName, setMemberName, memberEmail, setMemberEmail, memberPassword, setMemberPassword, memberTeam, setMemberTeam, createMember };
}
