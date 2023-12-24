
const Doctor = require('../models/doctorModel'); 

async function registerDoctor(req, res) {
  try {
    const { DoctorId, name, specialization} = req.body;


    if (!DoctorId || !name || !specialization) {
      return res.status(400).json({ error: 'Doctor ID, Name, and Specialization are required fields.' });
    }

    const doctor = await Doctor.findOne((DoctorId));

    if(doctor){
        return res.status(400).json({ error: 'Doctor already Register.' });
    }
    
    const newDoctor = new Doctor({
      DoctorId,
      name,
      specialization,
      charges: req.body.charges || undefined,
      phoneNumber: req.body.phoneNumber || undefined,
    });

    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  registerDoctor,
};

