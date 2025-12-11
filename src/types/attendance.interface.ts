export interface AttendanceInterface {
  id: string;
  studentId: string;
  date: string; 
  status: 'present' | 'absent';
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
