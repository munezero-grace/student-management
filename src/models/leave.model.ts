import { Schema, model, Document, Types } from "mongoose";

export interface ILeaveRequest extends Document {
  student: Types.ObjectId;
  date: Date;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  decidedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date;
}

const LeaveSchema = new Schema<ILeaveRequest>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    date: { type: Date, required: true },
    reason: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    decidedAt: { type: Date, required: false },
  },
  { timestamps: true }
);

export const LeaveModel = model<ILeaveRequest>("LeaveRequest", LeaveSchema);
export default LeaveModel;
