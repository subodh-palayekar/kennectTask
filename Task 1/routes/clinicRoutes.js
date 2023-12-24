const express = require("express");
const { registerClinic, addDoctor } = require("../controllers/clinicController");

const router = express.Router();

router.route("/register").post(registerClinic);
router.route("/addDoctor").post(addDoctor);



module.exports = router;