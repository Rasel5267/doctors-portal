const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name!"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please enter your email!"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please enter your password!"],
			minlength: 6,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		otp: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isDoctor: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			default: "pending",
		},
		notification: {
			type: Array,
			default: [],
		},
		seennotification: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
