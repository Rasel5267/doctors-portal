const userModel = require('../models/userModels');
const doctorModel = require('../models/doctorModel');

const getDoctorInfo = async (req, res) => {
	try {
		const doctor = await doctorModel.findOne({ userId: req.body.userId });
		res.status(200).send({
			success: true,
			message: 'Doctor data fetch success',
			data: doctor
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

const updateProfile = async (req, res) => {
	try {
		const doctor = await doctorModel.findOneAndUpdate( {userId: req.body.userId}, req.body );
		res.status(200).send({
			success: true,
			message: 'Doctor data fetch success',
			data: doctor
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

module.exports = { getDoctorInfo, updateProfile };