export type User = {
  id: string;
  name: string;
  email: string;
  role: 'MEMBER' | 'LEADER' | 'ADMIN';
};

export type Session = {
  token: string;
  user: User;
};

export type Role = 'MEMBER' | 'LEADER' | 'ADMIN';
export type MinistryTeam = 'SINGERS' | 'BAND';
export type EventType = 'SERVICE' | 'REHEARSAL' | 'WORSHIP_NIGHT' | 'SPECIAL_EVENT' | 'CUSTOM';
export type AttendanceResponseStatus = 'YES' | 'MAYBE' | 'NO' | 'PENDING';
