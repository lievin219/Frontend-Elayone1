import { useState } from 'react';
import type { AdminNotice } from './memberTypes';
import { useMemberAccount } from './useMemberAccount';
import { useMemberDirectory } from './useMemberDirectory';
import { usePasswordReset } from './usePasswordReset';

export type { AdminNotice } from './memberTypes';

export function useMemberManagement(setNotice: (notice: AdminNotice | null) => void) {
  const [busy, setBusy] = useState(false);
  const directory = useMemberDirectory(setNotice);
  const account = useMemberAccount(directory, setNotice, setBusy);
  const password = usePasswordReset(setNotice, setBusy);
  return { ...directory, ...account, ...password, busy };
}
