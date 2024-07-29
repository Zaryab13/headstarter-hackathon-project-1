import Event from "../models/event.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const addEvent = async (req, res) => {
  try {
    const {
      title,
      details,
      host,
      date,
      startTime,
      endTime,
      venue,
      onlineLink,
      city,
    } = req.body;

    const token = req.cookies.access_token;
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const event = new Event({
      userId: tokenInfo.userId,
      title,
      details,
      host,
      date,
      startTime,
      endTime,
      venue,
      onlineLink,
      city,
    });

    await event.save();

    await User.findByIdAndUpdate(tokenInfo.userId, {
      $push: { events: event._id },
    });

    res.status(200).json({ message: "Event has been registered" });
  } catch (error) {
    console.error("Error registering event:", error);
    res.status(500).json({
      message: "Event could not be registered, Server Error!!",
      error: error.message,
    });
  }
};

// delete
export const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the event to get the technicianId
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete the event
    await Event.findByIdAndDelete(id);

    // Update the technician document to remove the event ID from the array
    await User.findByIdAndUpdate(event.technicianId, {
      $pull: { events: id },
    });

    res.status(200).json("Event has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

// Function to get a event's that particular user has bookmarked
export const getUserBookmarkedEvents = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(tokenInfo.userId).populate(
      "bookmarkedEvents"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.bookmarkedEvents.length === 0) {
      return res.status(200).json({ message: "No bookmarked events" });
    }

    res.status(200).json({ bookmarks: user.bookmarkedEvents });
  } catch (err) {
    console.error("Error fetching bookmarked events:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch user's bookmarked events", err });
  }
};

// Get Events that are hosted by requested user
export const getUserHostedEvents = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(tokenInfo.userId).populate("hostedEvents");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.hostedEvents.length === 0) {
      return res.status(200).json({ message: "No hosted events" });
    }

    res.status(200).json({ hostedEvents: user.hostedEvents });
  } catch (err) {
    console.error("Error fetching hosted events:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch user's hosted events", err });
  }
};

// When user click on bookmark icon this api shoul be called to add that event to bookmaked Array in database
export const bookmarkEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const token = req.cookies.access_token;
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user and update their bookmarkedEvents array
    const user = await User.findByIdAndUpdate(
      tokenInfo.userId,
      { $addToSet: { bookmarkedEvents: eventId } },
      // $addToSet ensures no duplicates
      { new: true }
    ).populate("bookmarkedEvents");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Event has been bookmarked",
      bookmarks: user.bookmarkedEvents,
    });
  } catch (error) {
    console.error("Error bookmarking event:", error);
    res.status(500).json({
      message: "Event could not be bookmarked, Server Error!!",
      error: error.message,
    });
  }
};
