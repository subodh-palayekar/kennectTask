const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required:true,
  },
  name: {
    type: String,
    required:true,
  },
  phoneNumber :{
    type : Number
  },
  appointments:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Appointment",
  }],

});

 const Patient = mongoose.model('Patient',patientSchema);


 module.exports = Patient

