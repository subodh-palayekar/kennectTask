const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  DoctorId: {
    type: String,
    required:true,
  },
  name: {
    type: String,
    required:true,
  },
  specialization: {
    type: String,
    required:true,
  },
  charges: {
    type: Number,
  },
  phoneNumber: {
    type: Number,
  },
  clinics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
