const express = require("express");
const app = express();
const dotenv = require("dotenv");
const patientRoutes =  require("./routes/patientRoutes")
const appointmentRoutes =  require("./routes/appointmentRoutes")
const doctorRoutes =  require("./routes/doctorRoutes")
const clinicRoutes =  require("./routes/clinicRoutes")

dotenv.config()
const PORT = process.env.PORT || 5000 ; 
require("./db/connect")
app.use('/patient',patientRoutes);
app.use('/appointment',appointmentRoutes),
app.use('/doctor',doctorRoutes);
app.use('/clinic',clinicRoutes);


app.get("/",(req,res)=>{
    res.send("Welcome to health Buddy")
})


app.listen(PORT,()=>{
    console.log(`connected to PORT ${PORT}`);
})