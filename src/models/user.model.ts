import schema, { Schema, InferSchemaType } from "mongoose";

export const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      enum: ["admin", "student", "user"],
    },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
export const UserModal = schema.model("Users", UserSchema);
