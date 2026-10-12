import { useState } from 'react';
import { resetUserPassword } from '../../api';
import type { DirectoryUser } from '../../api';
import type { BusyState, NoticeSetter } from './memberTypes';

export function usePasswordReset(setNotice: NoticeSetter, setBusy: BusyState[1]) {
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  async function resetPasswordForUser(user: DirectoryUser) {
    if (resetPassword.length < 8) {
      setNotice({ type: 'error', text: 'The new password must be at least 8 characters.' });
      return;
    }
    setBusy(true); setNotice(null);
    try {
      const result = await resetUserPassword(user.id, resetPassword);
      setResetUserId(null); setResetPassword('');
      setNotice({ type: 'success', text: result.message });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'Could not reset this password.' });
    } finally { setBusy(false); }
  }
  return { resetUserId, setResetUserId, resetPassword, setResetPassword, resetPasswordForUser };
}
