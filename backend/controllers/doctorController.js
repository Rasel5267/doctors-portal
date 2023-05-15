const userModel = require('../models/userModels');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');

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

const doctorAppointments = async (req, res) => {
	try {
	  const doctor = await doctorModel.findOne({ userId: req.body.userId });
	  const appointments = await appointmentModel.find({
		doctorId: doctor._id,
	  });
	  res.status(200).send({
		success: true,
		message: "Doctor Appointments fetch Successfully",
		data: appointments,
	  });
	} catch (error) {
		res.status(500).send({ success: false, message: error.message});
	}
};
  
  const updateStatus = async (req, res) => {
	try {
	  const { appointmentsId, status } = req.body;
	  const appointments = await appointmentModel.findByIdAndUpdate(
		appointmentsId,
		{ status }
	  );
	  const user = await userModel.findOne({ _id: appointments.userId });
	  const notification = user.notification;
	  notification.push({
		type: "status-updated",
		message: `your appointment has been updated to ${status}`,
		onCLickPath: "/doctor-appointments",
	  });
	  await user.save();
	  res.status(200).send({
		success: true,
		message: "Appointment Status Updated",
	  });
	} catch (error) {
		res.status(500).send({ success: false, message: error.message});
	}
};

module.exports = { getDoctorInfo, updateProfile, doctorAppointments, updateStatus };