import { Schema, model, Document, Types } from "mongoose";

export interface IAttendance extends Document {
  student: Types.ObjectId;
  date: Date;
  status: "present" | "absent" | "late";
  notes?: string;
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
      enum: ["present", "absent", "late"],
      default: "present",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const AttendanceModel = model<IAttendance>(
  "Attendance",
  AttendanceSchema
);
export default AttendanceModel;
