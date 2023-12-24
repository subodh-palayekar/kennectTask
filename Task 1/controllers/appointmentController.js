const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Clinic = require("../models/clinicModel")


async function bookAppointment(req, res) {
  try {
    const { patientId, doctorId, clinicId, startTime, endTime,appointmentId } = req.body;

    if (
      !patientId ||
      !clinicId ||
      !startTime ||
      !endTime ||
      !appointmentId
    ) {
      return res.status(400).json({ error: "required field missing" });
    }

    let selectedDoctor
    if(!doctorId){

      const doctorsInClinic = await Doctor.find(clinicId);

      const freeDoctors = await getFreeDoctors(doctorsInClinic, startTime, endTime);
  
      if (freeDoctors.length === 0) {
        return res.status(404).json({ error: "No free doctors available for the specified timeSlot." });
      }
      selectedDoctor = freeDoctors[0];

    }

    const newAppointment = new Appointment({
      appointmentId,
      patientId,
      doctorId : req.body.doctorId || selectedDoctor.doctorId,
      clinicId,
      timeSlot: { startTime, endTime },
    });



    const appointment = await Appointment.find({ appointmentId });
    if (!appointment) {
      await newAppointment.save();
    } else {
      return res.json({ error: "appointment already exist" });
    }

  
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }
    patient.appointments.push(appointment);
    await patient.save();

    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return res.status(404).json({ error: "doctor not found." });
    }
    doctor.appointments.push(appointment);
    await doctor.save();


    const clinic = await Clinic.findOne({ clinicId });
    if (!clinic) {
      return res.status(404).json({ error: "clinic not found." });
    }
    clinic.appointments.push(appointment);
    await clinic.save();


    res.status(200).json(newAppointment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFreeDoctors(doctors, startTime, endTime) {
  const freeDoctors = await Promise.all(doctors.map(async (doctor) => {
    const bookedAppointments = await Appointment.find({
      doctor: doctor._id,
      timeSlot: { $gte: startTime, $lt: endTime },
    });

    if (bookedAppointments.length === 0) {
      return doctor;
    }
    return null;
  }));

  return freeDoctors.filter((doctor) => doctor !== null);
}

async function updateAppointment(req, res) {
  try {
    const { appointmentId, startTime, endTime } = req.body;

    if (!appointmentId || (!startTime && !endTime)) {
      return res.status(400).json({ error: " required fields are  missing." });
    }

    const appointment = await Appointment.findOne({ appointmentId });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    if (startTime) {
      appointment.timeSlot.startTime = startTime;
    }

    if (endTime) {
      appointment.timeSlot.endTime = endTime;
    }

    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function deleteAppointment(req, res) {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ error: "Appointment ID is a required field for deletion." });
    }

    const appointment = await Appointment.findOne({ appointmentId });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }


    const patient = await Patient.findOne({ patientId : appointment.patientId });
    if (patient) {
      patient.appointments.pull(appointment._id);
      await patient.save();
    }

    const doctor = await Doctor.findOne({ doctorId: appointment.doctorId });
    if (doctor) {
      doctor.appointments.pull(appointment._id);
      await doctor.save();
    }

    const clinic = await Clinic.findOne({ appointments: appointment.clinicId });
    if (clinic) {
      clinic.appointments.pull(appointment._id);
      await doctor.save();
    }


    await appointment.remove();

    res.status(200).json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




module.exports = {
  bookAppointment,
  updateAppointment,
  deleteAppointment,
};
