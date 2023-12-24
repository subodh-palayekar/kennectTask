const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  timeSlot: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
