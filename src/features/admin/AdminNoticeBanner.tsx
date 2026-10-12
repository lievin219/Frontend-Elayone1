import { Box, Label } from '../../components/WebUI';
import { styles } from '../../theme';
import type { AdminNotice } from './adminTypes';

export function AdminNoticeBanner({ notice }: { notice: AdminNotice | null }) {
  if (!notice) return null;
  const success = notice.type === 'success';
  return <Box style={[styles.noticeBanner, success ? styles.noticeSuccess : styles.noticeError]}>
    <Label style={[styles.noticeText, success ? styles.noticeTextSuccess : styles.noticeTextError]}>{notice.text}</Label>
  </Box>;
}
