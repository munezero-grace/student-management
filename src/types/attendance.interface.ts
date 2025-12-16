export interface AttendanceInterface {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
