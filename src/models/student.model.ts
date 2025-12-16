import { Schema, model, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  age?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true, index: true },
    age: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const StudentModel = model<IStudent>("Student", StudentSchema);
export default StudentModel;
