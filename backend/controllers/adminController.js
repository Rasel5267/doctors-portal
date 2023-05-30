const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModel");
const sendEmail = require("./sendEmail");
const appointmentModel = require("../models/appointmentModel");

const getAllDoctors = async (req, res) => {
	try {
		const doctors = await doctorModel.find({});

		res.status(200).send({
			success: true,
			message: "all doctors data",
			data: doctors,
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find({});

		res.status(200).send({
			success: true,
			message: "all users data",
			data: users,
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
};

const changeAccountStatus = async (req, res) => {
	try {
		const { doctorsId, status } = req.body;
		const doctor = await doctorModel.findByIdAndUpdate(doctorsId, {
			status: status,
		});
		const user = await userModel.findOne({ _id: doctor.userId });

		const notification = user.notification;
		notification.push({
			type: "doctor-account-request-updated",
			message: `Your Doctor Account Request Has ${status}`,
			onClickPath: "/dashboard/notification",
		});

		sendEmail(user.email, `Your Doctor Account Request Has ${status}`);

		user.isDoctor = status === "approved" ? true : false;
		await user.save();

		res.status(200).send({
			success: true,
			message: "Account status updated",
			data: doctor,
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
};

module.exports = {
	getAllDoctors,
	getAllUsers,
	changeAccountStatus,
};
