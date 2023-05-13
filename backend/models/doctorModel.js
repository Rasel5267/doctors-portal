const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
	userId: {
		type: String
	},
	firstName: {
        type: String,
        required: [true, "Please enter your first name!"],
    },
	lastName: {
        type: String,
        required: [true, "Please enter your last name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
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
    education: {
        type: String,
        required: [true, "Please enter your Medical College name!"],
    },
	certification: {
		type: String,
		required: [false, "Please provide if you have any extra certification!"],
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
		default: 'pending'
	},
    timings: {
        type: Object,
        required: [true, "Please enter your consultation time period!"],
    }
}, {
	timestamps: true,
	versionKey: false
});

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;