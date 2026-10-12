import { useCallback, useEffect, useState } from 'react';
import { getAttendanceReport } from '../../api';
import type { AttendanceReport } from '../../api';

export type MemberAttendance = AttendanceReport['members'][number];

export function useProfileAttendance(memberUserId: string) {
  const [attendance, setAttendance] = useState<MemberAttendance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => setReloadKey((current) => current + 1), []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getAttendanceReport('elayone-main-choir')
      .then((report) => {
        if (active) setAttendance(report.members.find((member) => member.id === memberUserId) ?? null);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : 'Could not load your attendance.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [memberUserId, reloadKey]);

  return { attendance, loading, error, reload };
}
