const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
		},
		name: {
			type: String,
			required: [true, "Please enter your name!"],
		},
		email: {
			type: String,
			required: [true, "Please enter your email!"],
			trim: true,
			unique: true,
		},
		phone: {
			type: String,
			required: [true, "Please enter your phone number!"],
		},
		address: {
			type: String,
			required: [true, "Please enter your address!"],
		},
		medical: {
			type: String,
			required: [true, "Please enter medical name where you work!"],
		},
		image: {
			type: String,
			required: [true, "Please enter a picture Url"],
		},
		education: {
			type: String,
			required: [true, "Please enter your Medical College name!"],
		},
		certification: {
			type: String,
		},
		specialization: {
			type: String,
			required: [true, "Please enter your specialization area!"],
		},
		experience: {
			type: String,
			required: [true, "Please enter your experience!"],
		},
		consultationFee: {
			type: Number,
			required: [true, "Please enter your consultation fee!"],
		},
		status: {
			type: String,
			default: "pending",
		},
		startTime: {
			type: String,
			required: [true, "Please enter your consultation Start time"],
		},
		endTime: {
			type: String,
			required: [true, "Please enter your consultation End time"],
		},
		perConsultationTime: {
			type: Number,
			required: [true, "Please enter per consultation time"],
		},
		offDay: {
			type: String,
			required: [true, "Please enter your consultation End time"],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
