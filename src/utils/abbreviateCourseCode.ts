export function abbreviateCourseCode(courseCode: string): {
  code: string;
  fullName: string;
} {
  // Pattern: COURSE_CODE - Course Title
  const match = courseCode.match(/^([A-Z]+\d+[A-Z]?\d*)\s*-\s*(.+)$/);

  if (match) {
    const [, code] = match;
    return {
      code: code.trim(),
      fullName: courseCode
    };
  }

  // No match - return as-is
  return {
    code: courseCode,
    fullName: courseCode
  };
}
