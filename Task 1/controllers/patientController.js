const Patient = require("../models/patientModel");

async function registerPatient(req, res) {
  try {
    const { patientId, name } = req.body;

    if (!patientId || !name) {
      return res
        .status(400)
        .json({ error: "Patient ID and Name are required fields." });
    }

    const newPatient = new Patient({
      patientId,
      name,
      phoneNumber : req.body.phoneNumber || undefined
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




module.exports = {
  registerPatient,
};
