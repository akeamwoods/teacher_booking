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
  students?: Student[];
};
