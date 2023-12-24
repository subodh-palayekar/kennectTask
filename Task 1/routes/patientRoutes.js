const express = require("express");
const { registerPatient } = require("../controllers/patientController");

const router = express.Router();

router.route("/register").post(registerPatient);
module.exports = router;