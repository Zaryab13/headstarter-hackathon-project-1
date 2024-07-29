import express from "express";
import {
  addEvent,
  getUserBookmarkedEvents,
  deleteEvent,
  getUserHostedEvents,
} from "../controllers/event.controller.js";

const router = express.Router();

// Createe
router.post("/add", addEvent);

// Delete
router.delete("/:id", deleteEvent);

// Get those Events that has been Bookmarked by the requested user
router.get("/getBookmarkedEvents", getUserBookmarkedEvents);

// Get those Events that has been Hosted by the requested user
router.get("/getHostedEvents", getUserHostedEvents);

// Get those Events that has been Hosted by the requested user
router.post("/bookmarkEvent", getUserHostedEvents);


export default router;
