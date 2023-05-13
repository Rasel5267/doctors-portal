const express = require('express');
const { loginController, registerController, authController, applyDoctor, getAllNotification } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);


router.post('/getUserData', auth, authController);

router.post('/apply-doctor', auth, applyDoctor);
router.post('/get-all-notification', auth, getAllNotification);

module.exports = router;