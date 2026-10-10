import { Holiday } from '../types';

/**
 * Generates an RFC 5545 compliant .ics (iCalendar) file string
 * Compatible with Apple Calendar, Google Calendar, Microsoft Outlook, iOS, and Android.
 */
export function generateIcsCalendar(
  holiday: Holiday,
  reminderDaysBefore: number = 1,
  customNotes?: string
): string {
  // Format dates: YYYYMMDD
  const rawDate = holiday.date.replace(/-/g, '');
  const d = new Date(holiday.date);
  d.setDate(d.getDate() + 1);
  const nextDate = d.toISOString().split('T')[0].replace(/-/g, '');

  const nowIso = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `${holiday.id}-${holiday.date}@worldfest.app`;

  const summary = `${holiday.name} (${holiday.country})`;
  const description = [
    `WorldFest Celebration: ${holiday.name}`,
    `Country: ${holiday.country}`,
    `Traditional Greeting: "${holiday.greeting}"`,
    `Sacred Traditions: ${holiday.traditions.join('; ')}`,
    holiday.foodDelicacies ? `Traditional Delicacies: ${holiday.foodDelicacies.join(', ')}` : '',
    customNotes ? `My Personal Notes: ${customNotes}` : '',
    `Lore: ${holiday.description}`
  ].filter(Boolean).join('\\n\\n');

  const location = holiday.country;

  // Alarm calculation in minutes (reminderDaysBefore in minutes: e.g. 1 day = 1440 minutes)
  const alarmMinutes = reminderDaysBefore * 24 * 60;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WorldFest//Global Holiday & Culture Encyclopedia//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowIso}`,
    `DTSTART;VALUE=DATE:${rawDate}`,
    `DTEND;VALUE=DATE:${nextDate}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    `TRIGGER:-PT${alarmMinutes}M`,
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${holiday.name} is approaching in ${reminderDaysBefore} day(s)!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Triggers native download of the .ics file to open in user's default calendar application
 */
export function downloadIcsFile(holiday: Holiday, reminderDaysBefore: number = 1, notes?: string): void {
  const icsContent = generateIcsCalendar(holiday, reminderDaysBefore, notes);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${holiday.id}-celebration.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates an instant, pre-filled Google Calendar web URL for a holiday
 */
export function getGoogleCalendarUrl(holiday: Holiday, notes?: string): string {
  const startDate = holiday.date.replace(/-/g, '');
  const d = new Date(holiday.date);
  d.setDate(d.getDate() + 1);
  const endDate = d.toISOString().split('T')[0].replace(/-/g, '');

  const details = encodeURIComponent(
    `${holiday.description}\n\nTraditional Greeting: "${holiday.greeting}"\nTraditions: ${holiday.traditions.join(', ')}${
      holiday.foodDelicacies ? `\nDelicacies: ${holiday.foodDelicacies.join(', ')}` : ''
    }${notes ? `\n\nPersonal Notes: ${notes}` : ''}\n\nBrought to you by WorldFest Global Holidays.`
  );
  const title = encodeURIComponent(`${holiday.name} (${holiday.country})`);
  const location = encodeURIComponent(holiday.country);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}
