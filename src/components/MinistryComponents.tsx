import { Label, TextField, ActionButton, Box, Icon } from './WebUI';
import React from 'react';

import { COLORS, styles } from '../theme';
import type { IconName } from '../types';

export function AdminForm({ title, icon, children }: { title: string; icon: IconName; children: React.ReactNode }) {
  return <Box className="admin-form" style={styles.adminForm}><Box style={styles.adminFormHeader}><Box style={styles.adminFormIcon}><Icon name={icon} size={18} color={COLORS.ink} /></Box><Label className="responsive-section-title" style={styles.adminFormTitle}>{title}</Label></Box>{children}</Box>;
}

export function Field({ label, value, onChangeText, placeholder, labelStyle, ...props }: { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; labelStyle?: React.ComponentProps<typeof Label>['style'] } & Omit<React.ComponentProps<typeof TextField>, 'value' | 'onChangeText' | 'placeholder'>) {
  return <Box className="field" style={styles.field}><Label className="field-label responsive-eyebrow" style={[styles.fieldLabel, labelStyle]}>{label}</Label><TextField {...props} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#8b8b88" selectionColor="#171717" style={[styles.fieldInput, props.multiline && styles.fieldInputMultiline]} /></Box>;
}

export function QuickAction({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return <ActionButton className="home-quick-action" style={styles.quickAction} onPress={onPress}><Box className="home-quick-icon" style={styles.quickIcon}><Icon name={icon} size={20} color={COLORS.ink} /></Box><Label className="home-quick-label" style={styles.quickLabel}>{label}</Label><Icon name="arrow-forward" size={15} color={COLORS.muted} /></ActionButton>;
}
