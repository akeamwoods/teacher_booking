export type Class = {
  id: string;
  year: number;
  group: string;
  students: Student[];
};

export type Student = {
  id: string;
  firstName: string;
  surname: string;
};

export type Lesson = {
  id: string;
  teacherId: string;
  subject: string;
  start: string;
  end: string;
  color: string;
  class?: Class;
  seriesId?: string;
};
