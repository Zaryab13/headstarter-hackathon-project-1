import mongoose, { Schema } from "mongoose";

// Event Schema
const eventSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    symptoms: {
      type: Array,
      required: true,
      default: [],
    },
    tests: [
      {
        type: Schema.Types.ObjectId,
        ref: "EegTest",
      },
    ],
  },
  { timestamps: true }
);


const Event = mongoose.model("Event", eventSchema);

export default Event;
