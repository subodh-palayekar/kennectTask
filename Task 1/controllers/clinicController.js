const Clinic = require("../models/clinicModel");
const Doctor = require("../models/doctorModel")

async function registerClinic(req, res) {
  try {
    const { clinicId, name, address } = req.body;

    if (!clinicId || !name || !address) {
      return res
        .status(400)
        .json({ error: "clinicId, Name, and address are required fields." });
    }


    const existingClinic = await Clinic.findOne({ clinicId });
    if (existingClinic) {
      return res.status(400).json({ error: "Clinic already registered." });
    }

    const newClinic = new Clinic({
      clinicId,
      name,
      address,
      phoneNumber: req.body.phoneNumber || undefined,
    });


    await newClinic.save();
    res.status(201).json(newClinic);

  } catch (error) {

    console.error("Error registering clinic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function addDoctor(req, res) {
    const { doctorId, clinicId } = req.body;
  
    if (!clinicId || !doctorId) {
      return res
        .status(400)
        .json({ error: "clinicId, and doctorId are required fields." });
    }
  
    const doctor = await Doctor.findOne({ doctorId });
    const clinic = await Clinic.findOne({ clinicId });
  
    if (!doctor || !clinic) {
      return res.status(404).json({ error: "Doctor or Clinic not found." });
    }
  
    clinic.doctors.push(doctor._id);
    doctor.clinics.push(clinic._id);
  
    await Promise.all([doctor.save(), clinic.save()]);
  
    res.status(200).json({ message: "Doctor added to the clinic successfully." });
}

module.exports = {
  registerClinic,
  addDoctor,
};
