export interface LeaveRequestInterface {
  id: string;
  studentId: string;
  date: string;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  decidedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date;
}
