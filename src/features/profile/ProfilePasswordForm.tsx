import React, { useState } from 'react';
import { changeMyPassword } from '../../api';
import { ActionButton, Box, Label } from '../../components/WebUI';
import { AdminForm, Field } from '../../components/MinistryComponents';
import { COLORS, styles } from '../../theme';

export function ProfilePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function changePassword() {
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'The new password must be at least 8 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'The new password and confirmation do not match.' });
      return;
    }

    setBusy(true);
    setMessage(null);
    try {
      const result = await changeMyPassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage({ type: 'success', text: result.message });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Could not change your password. Please try again.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminForm title="Password and security" icon="key-outline">
      <Label style={styles.adminHelp}>Use your current password to set a new password for your account.</Label>
      {message && (
        <Box style={[styles.noticeBanner, message.type === 'success' ? styles.noticeSuccess : styles.noticeError]}>
          <Label style={[styles.noticeText, message.type === 'success' ? styles.noticeTextSuccess : styles.noticeTextError]}>{message.text}</Label>
        </Box>
      )}
      <Field label="CURRENT PASSWORD" value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current password" secureTextEntry />
      <Field label="NEW PASSWORD" value={newPassword} onChangeText={setNewPassword} placeholder="At least 8 characters" secureTextEntry />
      <Field label="CONFIRM NEW PASSWORD" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Repeat new password" secureTextEntry />
      <ActionButton style={styles.adminButton} onPress={changePassword} disabled={busy}>
        <Label style={styles.adminButtonText}>{busy ? 'Updating…' : 'Update password'}</Label>
      </ActionButton>
    </AdminForm>
  );
}
