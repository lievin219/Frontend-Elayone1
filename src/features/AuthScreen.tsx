import { Spinner, Box, Image, ScrollArea, Label, ActionButton, useViewportSize } from '../components/WebUI';
import React, { useState } from 'react';


import { Icon } from '../components/WebUI';
import { Session, signIn } from '../api';
import { COLORS, styles } from '../theme';

import { Field } from '../components/MinistryComponents';
import logoUrl from '../../elayone.jpg';

export function AuthScreen({ onAuthenticated }: { onAuthenticated: (session: Session) => void }) {
  const { width } = useViewportSize();
  const isDesktop = width >= 1200;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError('');
    setBusy(true);
    try {
      const session = await signIn(email.trim(), password);
      onAuthenticated(session);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to connect right now.');
    } finally {
      setBusy(false);
    }
  }

  return <Box className="auth-screen" style={[styles.authSafeArea, isDesktop && styles.authDesktopSafeArea]}>
    <Box className="auth-motif" accessibilityLabel="Cross and musical notes">
      <Box className="auth-cross-glow" aria-hidden="true"><Box className="auth-cross-silhouette" /></Box>
      <Icon name="musical-notes-outline" size={160} color={COLORS.white} />
    </Box>
    <Box style={styles.authShell}>
      <ScrollArea contentContainerStyle={[styles.authContent, isDesktop && styles.authDesktopContent]}>
        {isDesktop && <Box className="auth-feature-panel" style={styles.authFeaturePanel}>
          <Box className="auth-feature-cross" aria-hidden="true"><Box className="auth-cross-silhouette" /></Box>
          <Box className="auth-feature-overlay" style={styles.authFeatureOverlay} />
          <Box style={styles.authFeatureContent}>
            <Label style={styles.authFeatureKicker}>ELAYONE · GOSPEL MUSIC MINISTRY</Label>
            <Label style={styles.authFeatureTitle}>Music brings us together.</Label>
            <Label style={styles.authFeatureBody}>A place for singers and band members to prepare and serve together.</Label>
            <Box style={styles.authFeatureVerse}>
              <Icon name="book-outline" size={18} color="#ffffff" />
              <Box style={{ flex: 1 }}>
                <Label style={styles.authFeatureVerseText}>“See, I am doing a new thing! Now it springs up; do you not perceive it?”</Label>
                <Label style={styles.authFeatureVerseReference}>ISAIAH 43:19</Label>
              </Box>
            </Box>
          </Box>
        </Box>}
        <Box className={`auth-card${isDesktop ? ' auth-desktop-card' : ''}`} style={[styles.authCard, isDesktop && styles.authDesktopCard]}>
          <Image source={logoUrl} style={styles.authBrandMark} accessibilityLabel="Elayone Music logo" />
          <Label style={styles.authBrand}>ELAYONE MUSIC</Label>
          <Label style={styles.authBrandSub}>GOSPEL MUSIC MINISTRY</Label>
          {!isDesktop && <Box style={[styles.authFeatureVerse, styles.authMobileVerse]}>
            <Icon name="book-outline" size={17} color="#ffffff" />
            <Box style={{ flex: 1 }}>
              <Label style={styles.authFeatureVerseText}>“See, I am doing a new thing! Now it springs up; do you not perceive it?”</Label>
              <Label style={styles.authFeatureVerseReference}>ISAIAH 43:19</Label>
            </Box>
          </Box>}
          <Box style={styles.authRule} />
          <Label style={styles.authTitle}>Welcome back.</Label>
          <Label style={styles.authCaption}>Sign in to see your team’s updates and events.</Label>
          <Field label="EMAIL ADDRESS" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
          <Field label="PASSWORD" value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry />
          {error ? <Label style={styles.authError}>{error}</Label> : null}
          <ActionButton className="auth-button" style={styles.authButton} onPress={submit} disabled={busy}>
            {busy ? <Spinner color={COLORS.white} /> : <><Label style={styles.authButtonText}>Sign in</Label><Icon name="arrow-forward" size={17} color={COLORS.white} /></>}
          </ActionButton>
          <Label style={styles.authAccountHelp}>Need an account or password reset? Please contact your ministry administrator.</Label>
        </Box>
      </ScrollArea>
    </Box>
  </Box>;
}
