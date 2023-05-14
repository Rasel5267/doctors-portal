const express = require('express');
const auth = require('../middleware/auth');
const { getDoctorInfo, updateProfile } = require('../controllers/doctorController');

const router = express.Router();

router.post('/getDoctorInfo', auth, getDoctorInfo);
router.post('/updateProfile', auth, updateProfile);


module.exports = router;