import { SemesterInfo } from '@/types/filters';

const SEMESTER_MAPPING = {
  Winter: [1, 2, 3, 4],       // Jan-Apr
  Spring: [5, 6],              // May-Jun
  Summer: [7, 8],              // Jul-Aug
  Fall: [9, 10, 11, 12]        // Sep-Dec
};

export function parseDateToSemester(dateString: string): SemesterInfo {
  // Extract "Sep 2025" from "Sep 2025 - Dec 2025"
  const startDate = dateString.split('-')[0].trim();
  const parts = startDate.split(' ');

  if (parts.length < 2) {
    // Fallback for malformed dates
    return {
      semester: 'Fall',
      year: '2025',
      label: 'Unknown',
      sortKey: '2025-01'
    };
  }

  const [monthStr, yearStr] = parts;

  // Convert "Sep" to month number 9
  const monthNum = new Date(`${monthStr} 1, 2000`).getMonth() + 1;

  // Find matching semester
  for (const [semester, months] of Object.entries(SEMESTER_MAPPING)) {
    if (months.includes(monthNum)) {
      return {
        semester: semester as 'Fall' | 'Winter' | 'Spring' | 'Summer',
        year: yearStr,
        label: `${semester} ${yearStr}`,
        sortKey: `${yearStr}-${months[0].toString().padStart(2, '0')}`
      };
    }
  }

  // Fallback
  return {
    semester: 'Fall',
    year: yearStr || '2025',
    label: `Unknown ${yearStr}`,
    sortKey: `${yearStr}-01`
  };
}
