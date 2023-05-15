const express = require('express');
const auth = require('../middleware/auth');
const { getDoctorInfo, updateProfile, doctorAppointments, updateStatus } = require('../controllers/doctorController');

const router = express.Router();

router.post('/getDoctorInfo', auth, getDoctorInfo);
router.post('/updateProfile', auth, updateProfile);

//GET Appointments
router.post("/doctor-appointments", auth, doctorAppointments);
  

router.post("/update-status", auth, updateStatus);


module.exports = router;