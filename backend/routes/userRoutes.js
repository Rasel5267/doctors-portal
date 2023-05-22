const express = require('express');
const { loginController, registerController, authController, applyDoctor, getAllNotification, deleteAllNotification, getUserInfo, updateProfile, getAllDoctors, getDoctorById, bookAppointment, bookingAvailability, getAllAppointments, verifyAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/verify', verifyAccount);

router.post('/getUserData', auth, authController);

router.post('/apply-doctor', auth, applyDoctor);
router.post('/get-all-notification', auth, getAllNotification);
router.post('/delete-all-notification', auth, deleteAllNotification);
router.post('/getUserInfo', auth, getUserInfo);
router.post('/updateProfile', auth, updateProfile);

router.get('/getAllDoctors', auth, getAllDoctors);
router.post('/getDoctor', auth, getDoctorById);

router.post('/book-appointment', auth, bookAppointment);

router.post('/appointments', auth, getAllAppointments);

module.exports = router;