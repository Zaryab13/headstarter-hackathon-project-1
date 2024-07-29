import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    host: {
      name: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    onlineLink: {
      type: String,
      required: false,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
