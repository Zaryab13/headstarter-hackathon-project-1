import express from "express";
import {
  addEvent,
  deleteEvent,
  getEventById,
  getEvents,
} from "../controllers/event.js";

const router = express.Router();

// Createe
router.post("/add", addEvent);

// Get
router.get("/getEventById/:id", getEventById);
// Get All
router.get("/getEvents", getEvents);

// Delete
router.delete("/:id", deleteEvent);

export default router;
