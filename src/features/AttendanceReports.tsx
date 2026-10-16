import { Spinner, Label, TextField, ActionButton, Box } from '../components/WebUI';
import React, { useEffect, useState } from 'react';


import { Icon } from '../components/WebUI';
import { AttendanceReport, AttendanceResponseStatus, getAttendanceReport } from '../api';
import { COLORS, styles } from '../theme';

import { responseLabels } from '../types';
import { getTeamName } from './ministryLabels';

export function AttendanceReportScreen({ canManage }: { canManage: boolean }) {
  const [report, setReport] = useState<AttendanceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [memberSearch, setMemberSearch] = useState('');
  const [needsResponseOnly, setNeedsResponseOnly] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getAttendanceReport('elayone-main-choir')
      .then((result) => { if (active) setReport(result); })
      .catch((requestError) => { if (active) setError(requestError instanceof Error ? requestError.message : 'Unable to load attendance reports.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [reloadKey]);

  const personalMember = report?.members[0] ?? null;
  const pendingMemberCount = report?.members.filter((member) => member.stats.pending > 0).length ?? 0;
  const filteredMembers = (report?.members ?? []).filter((member) => {
    const query = memberSearch.trim().toLowerCase();
    const matchesSearch = !query || `${member.name} ${member.email ?? ''} ${member.ministryTeam}`.toLowerCase().includes(query);
    return matchesSearch && (!needsResponseOnly || member.stats.pending > 0);
  });
  const summary = report?.summary;
  const statusCounts = summary ? { YES: summary.yes, MAYBE: summary.maybe, NO: summary.no, PENDING: summary.pending } : null;

  return (
    <Box className="report-dashboard">
      <Box className="report-hero" style={styles.reportHeadingRow}>
        <Box style={{ flex: 1 }}>
          <Label className="report-hero-kicker" style={styles.pageEyebrow}>ELAYONE / REPORTS</Label>
          <Label className="report-hero-title" style={styles.pageTitle}>{canManage ? 'Ministry reports' : 'My attendance'}</Label>
          <Label className="report-hero-caption">{canManage ? 'See who has replied to each event.' : 'See your replies for each event.'}</Label>
        </Box>
        <ActionButton className="report-refresh" style={styles.reportRefresh} onPress={() => setReloadKey((current) => current + 1)} accessibilityLabel="Refresh attendance report">
          <Icon name="refresh-outline" size={19} color="#7dc6c1" />
        </ActionButton>
      </Box>

      {loading ? <Box className="report-loading" style={styles.reportLoading}><Spinner color={COLORS.ink} /><Label className="report-hint" style={styles.reportHint}>Loading attendance report…</Label></Box> : error ? (
      <Box className="report-error" style={styles.reportError}><Label style={styles.reportErrorText}>{error}</Label><ActionButton onPress={() => setReloadKey((current) => current + 1)}><Label style={styles.reportRetry}>Try again</Label></ActionButton></Box>
      ) : report && summary ? (
        <>
          <Box className="report-notice" style={styles.reportNotice}>
            <Icon name="information-circle-outline" size={17} color={COLORS.olive} />
            <Label style={styles.reportNoticeText}>{canManage ? 'These are member responses. Available means a member selected YES, Maybe means they are unsure, Unavailable means they selected NO, and No response means they have not chosen yet.' : 'These are your event responses. Available means you selected YES, Maybe means you are unsure, Unavailable means you selected NO, and No response means you have not chosen yet.'}</Label>
          </Box>

          {canManage && <Box className="report-metrics" style={styles.reportMetricGrid}>
            <ReportMetric value={String(summary.members)} label="MINISTRY MEMBERS" />
            <ReportMetric value={String(summary.rehearsals)} label="EVENTS" />
            <ReportMetric value={`${summary.responseRate}%`} label="RESPONSE RATE" />
          </Box>}

          {!canManage && personalMember && <>
            <Box className="report-section-header" style={styles.reportSectionHeader}><Label className="report-section-title" style={styles.reportSectionTitle}>Your report snapshot</Label><Label className="report-section-meta" style={styles.reportSectionMeta}>{personalMember.events.length} events</Label></Box>
            <Box className="report-metrics" style={styles.reportMetricGrid}>
              <ReportMetric value={`${personalMember.stats.responseRate}%`} label="REPLIED" />
              <ReportMetric value={String(personalMember.stats.yes)} label="AVAILABLE" />
              <ReportMetric value={String(personalMember.stats.no)} label="UNAVAILABLE" />
              <ReportMetric value={String(personalMember.stats.pending)} label="NO REPLY" />
            </Box>
          </>}

          <Box className="report-card" style={styles.reportCard}>
            <Box className="report-card-header" style={styles.reportCardHeader}>
              <Box><Label className="report-card-title" style={styles.reportCardTitle}>{canManage ? 'Member responses' : 'Your responses'}</Label><Label className="report-card-caption" style={styles.reportCardCaption}>{canManage ? `${summary.total} member/event responses` : `${summary.total} of your event responses`}</Label></Box>
              <Label className="report-rate" style={styles.reportRate}>{summary.responseRate}%</Label>
            </Box>
            {statusCounts && <StatusDistribution counts={statusCounts} />}
            <Box className="report-legend" style={styles.reportLegend}>
              <ReportLegend color="#69c5a8" label={`Available ${summary.yes}`} />
              <ReportLegend color="#82aee0" label={`Maybe ${summary.maybe}`} />
              <ReportLegend color="#aa9be0" label={`Unavailable ${summary.no}`} />
              <ReportLegend color="#718492" label={`No response ${summary.pending}`} />
            </Box>
          </Box>

          {canManage ? (
            <>
              <Box className="report-section-header" style={styles.reportSectionHeader}><Label className="report-section-title" style={styles.reportSectionTitle}>Event breakdown</Label><Label className="report-section-meta" style={styles.reportSectionMeta}>{report.events.length} total</Label></Box>
              {report.events.length === 0 ? <ReportEmpty text="Event response summaries will appear after you add a rehearsal or service." /> : report.events.map((event) => (
                <Box key={event.id} className="report-event-card" style={styles.reportEventCard}>
                  <Box className="report-event-top" style={styles.reportEventTop}>
                    <Box style={{ flex: 1 }}><Label className="report-event-title" style={styles.reportEventTitle}>{event.title}</Label><Label className="report-event-meta" style={styles.reportEventMeta}>{new Date(event.startsAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} · {event.location}</Label></Box>
                    <Label className="report-event-type" style={styles.reportEventType}>{event.eventType.replace('_', ' ')}</Label>
                  </Box>
                  <StatusDistribution counts={{ YES: event.totals.yes, MAYBE: event.totals.maybe, NO: event.totals.no, PENDING: event.totals.pending }} />
                  <Box className="report-event-counts" style={styles.reportEventCounts}><Label className="report-available" style={styles.reportAvailableText}>{event.totals.yes} selected YES</Label><Label className="report-maybe" style={styles.reportMaybeText}>{event.totals.maybe} selected Maybe</Label><Label className="report-unavailable" style={styles.reportUnavailableText}>{event.totals.no} selected NO</Label><Label className="report-pending" style={styles.reportPendingText}>{event.totals.pending} no response</Label></Box>
                </Box>
              ))}

              <Box className="report-section-header" style={styles.reportSectionHeader}><Label className="report-section-title" style={styles.reportSectionTitle}>Individual reports</Label><Label className="report-section-meta" style={styles.reportSectionMeta}>{report.members.length} members</Label></Box>
              <Box className="report-search" style={styles.reportSearchWrap}>
                <Icon name="search-outline" size={17} color={COLORS.muted} />
                <TextField value={memberSearch} onChangeText={setMemberSearch} placeholder="Search by name or team" placeholderTextColor={COLORS.muted} accessibilityLabel="Search member reports" style={styles.reportSearchInput} />
                {memberSearch.length > 0 && <ActionButton onPress={() => setMemberSearch('')} accessibilityLabel="Clear member search"><Icon name="close-circle" size={17} color={COLORS.muted} /></ActionButton>}
              </Box>
              <Box className="report-filter-row" style={styles.reportFilterRow}>
                <ActionButton style={[styles.reportFilterChip, !needsResponseOnly && styles.reportFilterChipActive]} onPress={() => setNeedsResponseOnly(false)} accessibilityState={{ selected: !needsResponseOnly }}>
                  <Label style={[styles.reportFilterText, !needsResponseOnly && styles.reportFilterTextActive]}>All members · {report.members.length}</Label>
                </ActionButton>
                <ActionButton style={[styles.reportFilterChip, needsResponseOnly && styles.reportFilterChipActive]} onPress={() => setNeedsResponseOnly(true)} accessibilityState={{ selected: needsResponseOnly }}>
                  <Label style={[styles.reportFilterText, needsResponseOnly && styles.reportFilterTextActive]}>Needs reply · {pendingMemberCount}</Label>
                </ActionButton>
              </Box>
              {report.members.length === 0 ? <ReportEmpty text="Ministry members will appear here once they join." /> : filteredMembers.length === 0 ? <ReportEmpty text={memberSearch ? 'No member matches that search.' : 'No members are waiting to respond.'} /> : filteredMembers.map((member) => {
                const expanded = selectedMemberId === member.id;
                return <Box key={member.id} className="report-member-card" style={styles.reportMemberCard}>
                  <ActionButton style={styles.reportMemberTop} onPress={() => setSelectedMemberId(expanded ? null : member.id)} accessibilityRole="button" accessibilityLabel={`${expanded ? 'Hide' : 'View'} ${member.name}'s report`}>
                    <Box className="report-member-avatar" style={styles.reportMemberAvatar}><Label style={styles.reportMemberInitial}>{member.name.slice(0, 1).toUpperCase()}</Label></Box>
                    <Box style={{ flex: 1 }}><Label className="report-member-name" style={styles.reportMemberName}>{member.name}</Label><Label className="report-member-meta" style={styles.reportMemberMeta}>{getTeamName(member.ministryTeam)} · {member.stats.responseRate}% replied</Label></Box>
                    <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.muted} />
                  </ActionButton>
                  <StatusDistribution counts={{ YES: member.stats.yes, MAYBE: member.stats.maybe, NO: member.stats.no, PENDING: member.stats.pending }} />
                  <Box className="report-mini-counts" style={styles.reportMiniCounts}><Label className="report-available" style={styles.reportAvailableText}>YES {member.stats.yes}</Label><Label className="report-maybe" style={styles.reportMaybeText}>MAYBE {member.stats.maybe}</Label><Label className="report-unavailable" style={styles.reportUnavailableText}>NO {member.stats.no}</Label><Label className="report-pending" style={styles.reportPendingText}>PENDING {member.stats.pending}</Label></Box>
                  {expanded && <Box className="report-history" style={styles.reportHistory}>
                    <Box className="report-history-heading" style={styles.reportHistoryHeading}><Label className="report-history-title" style={styles.reportHistoryTitle}>{member.name} · event-by-event</Label><Label className="report-section-meta" style={styles.reportSectionMeta}>{member.events.length} events</Label></Box>
                    {member.events.length === 0 ? <Label style={styles.reportHint}>No events recorded yet.</Label> : member.events.map((event) => <ReportHistoryRow key={event.rehearsalId} title={event.title} date={event.startsAt} location={event.location} status={event.status} />)}
                  </Box>}
                </Box>;
              })}
            </>
          ) : (
            <>
              <Box className="report-section-header" style={styles.reportSectionHeader}><Label className="report-section-title" style={styles.reportSectionTitle}>Your event history</Label><Label className="report-section-meta" style={styles.reportSectionMeta}>{report.members[0]?.events.length ?? 0} events</Label></Box>
              {(personalMember?.events.length ?? 0) === 0 ? <ReportEmpty text="Your event response history will appear here when rehearsals and services are scheduled." /> : personalMember?.events.map((event) => <ReportHistoryRow key={event.rehearsalId} title={event.title} date={event.startsAt} location={event.location} status={event.status} />)}
            </>
          )}
          <Label className="report-generated" style={styles.reportGenerated}>Updated {new Date(report.generatedAt).toLocaleString()}</Label>
        </>
      ) : <ReportEmpty text="No attendance report is available yet." />}
    </Box>
  );
}

export function ReportMetric({ value, label }: { value: string; label: string }) {
  return <Box className="report-metric" style={styles.reportMetric}><Label style={styles.reportMetricValue}>{value}</Label><Label className="report-metric-label" style={styles.reportMetricLabel}>{label}</Label></Box>;
}

export function StatusDistribution({ counts }: { counts: Record<AttendanceResponseStatus, number> }) {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const segments: Array<{ key: AttendanceResponseStatus; color: string }> = [
    { key: 'YES', color: '#69c5a8' }, { key: 'MAYBE', color: '#82aee0' }, { key: 'NO', color: '#aa9be0' }, { key: 'PENDING', color: '#718492' },
  ];
  return <Box className="report-distribution" style={styles.reportBar}>{segments.map(({ key, color }) => <Box key={key} className={`report-segment report-segment-${key.toLowerCase()}`} style={{ width: `${total ? (counts[key] / total) * 100 : 0}%`, height: '100%', backgroundColor: color }} />)}</Box>;
}

export function ReportLegend({ color, label }: { color: string; label: string }) {
  return <Box className="report-legend-item" style={styles.reportLegendItem}><Box className="report-legend-dot" style={[styles.reportLegendDot, { backgroundColor: color }]} /><Label className="report-legend-text" style={styles.reportLegendText}>{label}</Label></Box>;
}

export function ReportHistoryRow({ title, date, location, status }: { title: string; date: string; location: string; status: AttendanceResponseStatus }) {
  const pillStyle = status === 'YES' ? styles.reportPillYes : status === 'MAYBE' ? styles.reportPillMaybe : status === 'NO' ? styles.reportPillNo : styles.reportPillPending;
  return <Box className="report-history-row" style={styles.reportHistoryRow}>
    <Box style={{ flex: 1 }}><Label className="report-event-title" style={styles.reportEventTitle}>{title}</Label><Label className="report-event-meta" style={styles.reportEventMeta}>{new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} · {location}</Label></Box>
    <Box className={`report-pill report-pill-${status.toLowerCase()}`} style={[styles.reportPill, pillStyle]}><Label className="report-pill-text" style={styles.reportPillText}>{responseLabels[status]}</Label></Box>
  </Box>;
}

export function ReportEmpty({ text }: { text: string }) {
  return <Box className="report-empty" style={styles.reportEmpty}><Icon name="bar-chart-outline" size={22} color={COLORS.muted} /><Label className="report-empty-text" style={styles.reportEmptyText}>{text}</Label></Box>;
}
