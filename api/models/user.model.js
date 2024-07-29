import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdult: {
      type: Boolean,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    bookmarkedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    hostedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
