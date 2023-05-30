const express = require("express");
const auth = require("../middleware/auth");
const {
	getAllDoctors,
	getAllUsers,
	changeAccountStatus,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/doctors", auth, getAllDoctors);
router.get("/users", auth, getAllUsers);
router.post("/changeAccountStatus", auth, changeAccountStatus);

module.exports = router;
