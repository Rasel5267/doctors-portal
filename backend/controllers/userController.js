const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');

const registerController = async(req, res) => {
	try {
		const existingUser = await userModel.findOne({email: req.body.email});
		if(existingUser) {
			return res.status(200).send({message: 'User Already Exist', success: false});
		}

		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		req.body.password = hashPassword;

		const newUser = new userModel(req.body);
		await newUser.save();
		
		res.status(201).send({message: "Register Successfully", success: true});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
};

const loginController = async(req, res) => {
	try {
		const user = await userModel.findOne({email: req.body.email});

		if(!user) {
			return res.status(200).send({ success: false, message: 'User not found'});
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if(!isMatch){
			return res.status(200).send({message: 'Invalid Email or Password', success: false});
		}
		
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'});

		res.status(200).send({message: 'Login Success', success: true, token});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
};

const authController = async (req, res) => {
	try {
		const user = await userModel.findOne({_id: req.body.userId});
		if(!user) {
			return res.status(200).send({message: "user not found", success: false})
		} else {
			res.status(200).send({
				success: true,
				data: user
			})
		};
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

const applyDoctor = async (req, res) => {
	try {
		const existingDoctor = await doctorModel.findOne({email: req.body.email});
		if(existingDoctor) {
			return res.status(200).send({message: 'Doctor Already Exist', success: false});
		}

		const newDoctor = await doctorModel({...req.body, status: 'pending'});
		await newDoctor.save();

		const adminUser = await userModel.findOne({isAdmin: true});
		const notification = adminUser.notification;
		notification.push({
			type: 'apply-doctor-request',
			message: `${newDoctor.name} has applied for a doctor account`,
			data: {
				doctorId: newDoctor._id,
				name: newDoctor.name,
				onClickPath: '/dashboard/doctors'
			}
		})
		await userModel.findByIdAndUpdate(adminUser._id, {notification});

		res.status(200).send({message: 'Application successfully submit. Wait for admin confirmation', success: true});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}


const getAllNotification = async (req, res) => {
	try {
		const user = await userModel.findOne({_id: req.body.userId});
		const seennotification = user.seennotification;
		const notification = user.notification;
		seennotification.push(...notification);
		user.notification = [];
		user.seennotification = notification;
		const updateUser = await user.save();
		res.status(200).send({
			success: true,
			message: 'all notification mark as read',
			data: updateUser
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

const deleteAllNotification = async (req, res) => {
	try {
		const user = await userModel.findOne({_id: req.body.userId});
		user.notification = [];
		user.seennotification = [];

		const updateUser = await user.save();
		updateUser.password = undefined;
		res.status(200).send({
			success: true,
			message: 'all notification mark as read',
			data: updateUser
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

const getUserInfo = async (req, res) => {
	try {
		const user = await userModel.findOne({ _id: req.body.userId });
		res.status(200).send({
			success: true,
			message: 'User data fetch success',
			data: user
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

const updateProfile = async (req, res) => {
	try {
		const user = await userModel.findOneAndUpdate( {_id: req.body.userId}, req.body );
		res.status(200).send({
			success: true,
			message: 'User data fetch success',
			data: user
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

const getAllDoctors = async (req, res) => {
	try {
		const doctors = await doctorModel.find({ status: 'approved' });
		res.status(200).send({
			success: true,
			message: 'Doctors list fetch success',
			data: doctors
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message})
	}
}

module.exports = { loginController, registerController, authController, applyDoctor, getAllNotification, deleteAllNotification, getUserInfo, updateProfile, getAllDoctors };