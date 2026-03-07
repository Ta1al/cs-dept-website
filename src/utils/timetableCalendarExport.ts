// .ics calendar export utilities for the timetable feature

import type { FlatRecord } from './timetableTypes';

function getDayOffset(dayName: string): number {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days.indexOf(dayName);
}

function getNextOccurrence(dayName: string): Date {
  const today = new Date();
  const targetDay = getDayOffset(dayName);
  const currentDay = today.getDay();
  let daysUntilTarget = targetDay - currentDay;

  if (daysUntilTarget <= 0) {
    daysUntilTarget += 7;
  }

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntilTarget);
  return nextDate;
}

function formatDateForICS(date: Date, time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  const hour = String(newDate.getHours()).padStart(2, '0');
  const minute = String(newDate.getMinutes()).padStart(2, '0');

  return `${year}${month}${day}T${hour}${minute}00`;
}

function createICSEvent(record: FlatRecord): string {
  const classDate = getNextOccurrence(record.day);

  const startTime = formatDateForICS(classDate, record.start_time);
  const endTime = formatDateForICS(
    classDate,
    record.end_time || record.start_time
  );

  const title = record.course_title || 'Class';
  const description = [
    record.course_code ? `Course Code: ${record.course_code}` : '',
    record.teacher_name ? `Teacher: ${record.teacher_name}` : '',
    record.program_line ? `Program: ${record.program_line}` : '',
    record.semester ? `Semester: ${record.semester}` : '',
    record.section ? `Section: ${record.section}` : '',
    record.practical ? 'Type: Practical' : '',
    record.combined_class ? 'Type: Combined Class' : '',
  ]
    .filter(Boolean)
    .join('\\n');

  const location = `Room ${record.room}`;
  const uid = `${record.course_code}-${record.day}-${record.start_time}-${Date.now()}@cs-dept.edu`;

  const now = new Date();
  const dtstamp = formatDateForICS(
    now,
    `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  );

  return `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT`;
}

export function generateICSFile(records: FlatRecord[]): string {
  const events = records.map(createICSEvent).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CS Department//Timetable//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:CS Department Timetable
X-WR-TIMEZONE:Asia/Karachi
${events}
END:VCALENDAR`;
}

export function downloadICS(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
