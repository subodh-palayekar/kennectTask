const express = require("express");
const {bookAppointment, updateAppointment, deleteAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.route("/book").post(bookAppointment);
router.route("/update").patch(updateAppointment);
router.route("/delete").delete(deleteAppointment);


module.exports = router;