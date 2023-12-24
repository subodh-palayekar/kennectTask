const express = require("express");
const {registerDoctor} = require("../controllers/doctorController")
const router = express.Router();

router.route('/register').post(registerDoctor);


module.exports = router;