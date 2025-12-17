import { Schema, model, Document, Types } from "mongoose";

export interface IAttendance extends Document {
  student: Types.ObjectId;
  date: Date;
  status: "present" | "absent" | "late" | "excused";
  notes?: string;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["present", "absent", "late", "excused"],
      default: "present",
    },
    notes: { type: String },
    deletedAt: { type: Date, required: false },
  },
  { timestamps: true }
);

AttendanceSchema.index(
  { student: 1, date: 1 },
  { unique: true, partialFilterExpression: { deletedAt: { $exists: false } } }
);

export const AttendanceModel = model<IAttendance>(
  "Attendance",
  AttendanceSchema
);
export default AttendanceModel;
