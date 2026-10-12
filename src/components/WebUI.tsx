import React, { useEffect, useState } from 'react';
import type { CSSProperties, ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import {
  Activity, ArrowRight, AudioLines, BarChart3, Bell, BellOff, BookOpen, CalendarDays, Check, CheckSquare, ChevronDown,
  ChartNoAxesColumnIncreasing, ChevronLeft, ChevronRight, ChevronUp, CircleHelp, CirclePause, CirclePlay, CircleUserRound, CircleX, Clock3, Cross,
  CloudUpload, Info, KeyRound, LogOut, MapPin, Megaphone, MessageCircle, Music2, Plus, RefreshCw, Search,
  House, ShieldCheck, Square, Trash2, UserRound, UserRoundMinus, UserRoundPlus, Users, X, type LucideIcon,
} from 'lucide-react';

type StyleValue = Record<string, unknown> | false | null | undefined | StyleValue[];

function toCssStyle(style: StyleValue): CSSProperties {
  if (Array.isArray(style)) {
    return style.reduce<CSSProperties>((merged, item) => Object.assign(merged, toCssStyle(item)), {});
  }
  if (!style) return {};
  const source = style as Record<string, unknown>;
  const result: Record<string, unknown> = { ...source };
  if (typeof source.lineHeight === 'number') {
    result.lineHeight = `${source.lineHeight}px`;
  }
  delete result.shadowColor;
  delete result.shadowOffset;
  delete result.shadowOpacity;
  delete result.shadowRadius;
  delete result.elevation;
  delete result.textAlignVertical;
  if (typeof source.paddingHorizontal === 'number') {
    result.paddingLeft = source.paddingHorizontal;
    result.paddingRight = source.paddingHorizontal;
    delete result.paddingHorizontal;
  }
  if (typeof source.paddingVertical === 'number') {
    result.paddingTop = source.paddingVertical;
    result.paddingBottom = source.paddingVertical;
    delete result.paddingVertical;
  }
  if (typeof source.marginHorizontal === 'number') {
    result.marginLeft = source.marginHorizontal;
    result.marginRight = source.marginHorizontal;
    delete result.marginHorizontal;
  }
  if (typeof source.marginVertical === 'number') {
    result.marginTop = source.marginVertical;
    result.marginBottom = source.marginVertical;
    delete result.marginVertical;
  }
  return result as CSSProperties;
}

type BoxProps = Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'role' | 'aria-label' | 'aria-checked' | 'aria-selected' | 'aria-disabled'> & {
  style?: StyleValue;
  contentContainerStyle?: StyleValue;
  accessibilityRole?: string;
  accessibilityLabel?: string;
  accessibilityState?: { checked?: boolean; selected?: boolean; disabled?: boolean };
  behavior?: string;
};

export function Box({ style, contentContainerStyle, accessibilityRole, accessibilityLabel, accessibilityState, ...props }: BoxProps) {
  return <div
    {...props}
    style={{ display: 'flex', flexDirection: 'column', ...toCssStyle(style) }}
    role={accessibilityRole}
    aria-label={accessibilityLabel}
    aria-checked={accessibilityState?.checked}
    aria-selected={accessibilityState?.selected}
    aria-disabled={accessibilityState?.disabled}
  />;
}

type LabelProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style' | 'role' | 'aria-label'> & {
  style?: StyleValue;
  accessibilityRole?: string;
  accessibilityLabel?: string;
};

export function Label({ style, accessibilityRole, accessibilityLabel, ...props }: LabelProps) {
  return <span {...props} style={toCssStyle(style)} role={accessibilityRole} aria-label={accessibilityLabel} />;
}

type ActionButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'onClick' | 'type' | 'role' | 'aria-label' | 'aria-checked' | 'aria-selected' | 'aria-disabled'> & {
  onPress?: () => void;
  className?: string;
  style?: StyleValue;
  accessibilityRole?: string;
  accessibilityLabel?: string;
  accessibilityState?: { checked?: boolean; selected?: boolean; disabled?: boolean };
};

export function ActionButton({ onPress, className, style, accessibilityRole, accessibilityLabel, accessibilityState, ...props }: ActionButtonProps) {
  return <button
    {...props}
    className={className}
    type="button"
    onClick={onPress}
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, ...toCssStyle(style) }}
    role={accessibilityRole}
    aria-label={accessibilityLabel}
    aria-checked={accessibilityState?.checked}
    aria-selected={accessibilityState?.selected}
    aria-disabled={accessibilityState?.disabled}
  />;
}

type TextFieldProps = Pick<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'disabled' | 'name' | 'id' | 'required' | 'autoComplete' | 'maxLength' | 'minLength' | 'readOnly'> & {
  onChangeText?: (value: string) => void;
  style?: StyleValue;
  multiline?: boolean;
  keyboardType?: string;
  autoCapitalize?: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  selectionColor?: string;
  accessibilityLabel?: string;
  type?: string;
};

export function TextField({
  onChangeText, style, multiline, keyboardType, autoCapitalize, secureTextEntry, placeholderTextColor, selectionColor,
  accessibilityLabel, ...props
}: TextFieldProps) {
  const fieldStyle = { ...toCssStyle(style), ...(placeholderTextColor ? { '--placeholder-color': placeholderTextColor } as CSSProperties : {}), ...(selectionColor ? { accentColor: selectionColor } : {}) };
  if (multiline) {
    return <textarea
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.disabled}
      name={props.name}
      id={props.id}
      required={props.required}
      autoComplete={props.autoComplete}
      maxLength={props.maxLength}
      minLength={props.minLength}
      readOnly={props.readOnly}
      aria-label={accessibilityLabel}
      onChange={(event) => onChangeText?.(event.currentTarget.value)}
      style={fieldStyle}
      rows={4}
    />;
  }
  return <input
    {...props}
    aria-label={accessibilityLabel}
    onChange={(event) => onChangeText?.(event.currentTarget.value)}
    type={secureTextEntry ? 'password' : keyboardType === 'email-address' ? 'email' : keyboardType === 'numeric' ? 'number' : props.type ?? 'text'}
    autoCapitalize={autoCapitalize}
    style={fieldStyle}
  />;
}

type ScrollAreaProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  style?: StyleValue;
  contentContainerStyle?: StyleValue;
  showsVerticalScrollIndicator?: boolean;
};

export function ScrollArea({ style, contentContainerStyle, showsVerticalScrollIndicator: _showsVerticalScrollIndicator, ...props }: ScrollAreaProps) {
  return <div {...props} style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', minHeight: 0, ...toCssStyle(style) }}><div style={{ display: 'flex', flexDirection: 'column', ...toCssStyle(contentContainerStyle) }}>{props.children}</div></div>;
}

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'style' | 'alt'> & {
  source: string;
  style?: StyleValue;
  resizeMode?: string;
  accessibilityLabel?: string;
};

export function Image({ source, style, resizeMode: _resizeMode, accessibilityLabel, ...props }: ImageProps) {
  return <img {...props} src={source} alt={accessibilityLabel ?? ''} style={toCssStyle(style)} />;
}

export function Spinner({ color = 'currentColor', size = 19 }: { color?: string; size?: number | 'small' | 'large' }) {
  const iconSize = size === 'small' ? 16 : size === 'large' ? 28 : size;
  return <Activity aria-label="Loading" size={iconSize} color={color} className="loading-spinner" />;
}

export function useViewportSize() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return { width };
}

const iconMap: Record<string, LucideIcon> = {
  'notifications-outline': Bell,
  'log-out-outline': LogOut,
  'checkbox': CheckSquare,
  'checkbox-outline': CheckSquare,
  'square-outline': Square,
  'checkmark': Check,
  'checkmark-circle': Check,
  'arrow-forward': ArrowRight,
  'calendar-outline': CalendarDays,
  'people-outline': Users,
  'people-circle-outline': Users,
  'musical-notes': Music2,
  'musical-notes-outline': Music2,
  'audio-lines-outline': AudioLines,
  'notifications-off-outline': BellOff,
  'person-circle-outline': CircleUserRound,
  'search-outline': Search,
  'close': X,
  'shield-checkmark-outline': ShieldCheck,
  'refresh-outline': RefreshCw,
  'person-remove-outline': UserRoundMinus,
  'trash-outline': Trash2,
  'cloud-upload-outline': CloudUpload,
  'information-circle-outline': Info,
  'close-circle': CircleX,
  'bar-chart-outline': BarChart3,
  'chevron-back': ChevronLeft,
  'chevron-forward': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'time-outline': Clock3,
  'location-outline': MapPin,
  'add': Plus,
  'book-outline': BookOpen,
  'key-outline': KeyRound,
  'help-circle-outline': CircleHelp,
  'play-circle-outline': CirclePlay,
  'pause-circle-outline': CirclePause,
  'megaphone-outline': Megaphone,
  'person-add-outline': UserRoundPlus,
  'chatbubble-ellipses-outline': MessageCircle,
  'cross-outline': Cross,
  'home-outline': House,
  'stats-chart-outline': ChartNoAxesColumnIncreasing,
  'person-outline': UserRound,
};

export function Icon({ name, size = 20, color = 'currentColor', style }: { name: string; size?: number; color?: string; style?: StyleValue }) {
  const IconComponent = iconMap[name] ?? CircleHelp;
  return <IconComponent size={size} color={color} style={toCssStyle(style)} aria-hidden="true" />;
}

type AlertButton = { text: string; style?: 'cancel' | 'destructive'; onPress?: () => void | Promise<void> };

export const Alert = {
  alert(title: string, message?: string, buttons?: AlertButton[]) {
    if (buttons?.some((button) => button.style === 'destructive')) {
      if (window.confirm(`${title}\n\n${message ?? ''}`)) {
        void buttons.find((button) => button.style === 'destructive')?.onPress?.();
      }
      return;
    }
    window.alert(message ? `${title}\n\n${message}` : title);
    buttons?.[0]?.onPress?.();
  },
};
