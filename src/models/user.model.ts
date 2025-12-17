import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },

    role: {
      type: String,
      enum: ["admin", "student", "user"],
      default: "user",
      required: true,
    },

    password: {
      required: true,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
