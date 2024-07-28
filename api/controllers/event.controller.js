import Patient from "../models/patient.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Function to get a patient's data by their ID
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the patient by ID
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    console.error("Error fetching patient data:", err);
    res.status(500).json({ message: "Failed to fetch patient data" });
  }
};
export const addPatient = async (req, res) => {
  try {
    const { name, fatherName, age, gender, cell, email, address, weight } =
      req.body;

    const token = req.cookies.access_token;
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check for existing patient with the same email
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res
        .status(400)
        .json({ message: "Patient with this email is already registered" });
    }

    const patient = new Patient({
      technicianId: tokenInfo.userId,
      name,
      fatherName,
      age,
      gender,
      cell,
      email,
      address,
      weight,
    });

    await patient.save();

    await User.findByIdAndUpdate(tokenInfo.userId, {
      $push: { patients: patient._id },
    });

    res.status(200).json({ message: "Patient has been registered" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Patient could not be registered, Server Error!!" });
  }
};

// To Get Patients based on the technician that registered them
export const getPatients = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Patient model has a field `technicianId` which stores the technician's user ID
    const patients = await Patient.find({ technicianId: tokenInfo.userId });

    res.json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

export const getPatientTestHistory = async (req, res) => {
  // console.log("Endpoint History Hitted");
  try {
    const { id } = req.params;

    // Find the patient by ID and populate the tests array with EEGTest documents
    const patient = await Patient.findById(id).populate("tests");

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient.tests);
  } catch (err) {
    console.error("Error fetching patient's test history:", err);
    res.status(500).json({ error: "Failed to fetch patient's test history" });
  }
};
// delete
export const deletePatient = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the patient to get the technicianId
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Delete the patient
    await Patient.findByIdAndDelete(id);

    // Update the technician document to remove the patient ID from the array
    await User.findByIdAndUpdate(patient.technicianId, {
      $pull: { patients: id },
    });

    res.status(200).json("Patient has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
