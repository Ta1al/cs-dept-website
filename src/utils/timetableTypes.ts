// Shared type definitions for the timetable feature

export interface RawEntry {
  combined_class: boolean | null;
  course_title: string | null;
  course_code: string | null;
  program_line: string | null;
  degree: string | null;
  program: string | null;
  section: string | null;
  session: string | null;
  semester: number | null;
  teacher_name: string | null;
  start_time: string | null;
  end_time: string | null;
  practical: boolean | null;
  raw_lines?: string[];
}

export interface FlatRecord {
  day: string;
  room: string;
  course_title: string;
  course_code: string;
  program_line: string;
  degree: string;
  program: string;
  section: string;
  session: string;
  semester: number | null;
  teacher_name: string;
  combined_class: boolean | null;
  start_time: string;
  end_time: string;
  practical: boolean | null | undefined;
  raw: string[];
}

export type RawData = Record<string, Record<string, RawEntry[]>>;
