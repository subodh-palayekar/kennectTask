const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  clinicId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required :true,
  },
  phoneNumber: {
    type: Number,
  },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
}, { timestamps: true });

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;
