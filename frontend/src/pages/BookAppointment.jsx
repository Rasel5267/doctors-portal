import { useParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../styles/home.css";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Calender.css";

const BookAppointment = () => {
	const { doctorId } = useParams();
	const [doctor, setDoctor] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedTime, setSelectedTime] = useState("");
	const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const getDoctor = async () => {
		try {
			const res = await axios.post(
				"http://localhost:8000/user/getDoctor",
				{ doctorId: doctorId },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			if (res.data.success) {
				setDoctor(res.data.data);
				setStartTime(res.data.data.startTime);
				setEndTime(res.data.data.endTime);
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		getDoctor();
	}, []);

	useEffect(() => {
		const fetchAppointments = async () => {
			// Example API call using fetch:
			const res = await axios.post(
				"http://localhost:8000/user/available-appointments",
				{ doctorId: doctor._id, date: selectedDate },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setAppointments(res.data.data);
		};

		if (selectedDate) {
			fetchAppointments();
		}
	}, [doctor._id, selectedDate]);

	const renderAvailableTimeSlots = () => {
		if (!startTime || !endTime) {
			return null;
		}

		const start = new Date(`${selectedDate}T${startTime}`);
		const end = new Date(`${selectedDate}T${endTime}`);

		const currentTime = new Date(); // Get the current time

		// Adjust the start time if it's in the past
		if (currentTime > start) {
			start.setMinutes(
				currentTime.getMinutes() + doctor.perConsultationTime
			);
		}

		const availableTimeSlots = [];
		const bookedTimeSlots = appointments.map(
			(appointment) => appointment.time
		);

		console.log(bookedTimeSlots);

		let currentSlot = new Date(start);
		while (currentSlot < end) {
			const formattedTime = currentSlot.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			});
			const isBooked = bookedTimeSlots.includes(formattedTime);

			if (!isBooked && currentSlot > currentTime) {
				availableTimeSlots.push(formattedTime);
			}

			currentSlot.setMinutes(
				currentSlot.getMinutes() + doctor.perConsultationTime
			);
		}

		const handleTimeSlotClick = (timeSlot) => {
			setSelectedTimeSlot(timeSlot);
			setSelectedTime(timeSlot);
		};

		return (
			<div className="mt-3">
				<h3>Available Time Slots:</h3>
				<div className="my-3">
					{availableTimeSlots.map((timeSlot) => (
						<button
							key={timeSlot}
							className="slotBtn"
							onClick={() => handleTimeSlotClick(timeSlot)}
							style={{
								backgroundColor:
									timeSlot === selectedTimeSlot
										? "#39c7a5"
										: "",
							}}
						>
							{timeSlot}
						</button>
					))}
				</div>
			</div>
		);
	};

	const renderBookedTimeSlots = () => {
		// Replace this with your logic to filter and display the booked time slots
		const bookedTimeSlots = appointments.map(
			(appointment) => appointment.time
		);

		return (
			<div className="mt-3">
				<h3>Booked Time Slots:</h3>
				<div className="my-3">
					{bookedTimeSlots.map((timeSlot) => (
						<button disabled key={timeSlot} className="slotBtn">
							{timeSlot}
						</button>
					))}
				</div>
			</div>
		);
	};

	const handleBooking = async () => {
		try {
			dispatch(showLoading());
			const res = await axios.post(
				"http://localhost:8000/user/book-appointment",
				{
					doctorId: doctorId,
					userId: user._id,
					doctorInfo: doctor,
					userInfo: user,
					date: selectedDate,
					time: selectedTime,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			dispatch(hideLoading());
			if (res.data.success) {
				message.success(res.data.message);
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			message.error(error.message);
		}
	};

	return (
		<div className="bookAppointment py-5">
			<h1 className="text-center pb-5">Book An Appointment</h1>
			{doctor && (
				<div className="row d-flex justify-content-between items-center">
					<div className="col-sm-6 mb-5">
						<h4>Dr. {doctor.name}</h4>
						<div className="d-flex justify-content-between doctor_info">
							<p className="doctor_info_title">
								Consultation Fee :
							</p>
							<p>Tk. {doctor.consultationFee}</p>
						</div>
						<div className="d-flex justify-content-between doctor_info">
							<p className="doctor_info_title">
								Consultation Start Time :
							</p>
							<p>{doctor.startTime}</p>
						</div>
						<div className="d-flex justify-content-between doctor_info">
							<p className="doctor_info_title">
								Consultation End Time :
							</p>
							<p>{doctor.endTime}</p>
						</div>
					</div>
					<div className="col-sm-6">
						<div>
							<h2>Select a date:</h2>
							<input
								type="date"
								value={selectedDate}
								onChange={(e) =>
									setSelectedDate(e.target.value)
								}
							/>

							{selectedDate && (
								<div>
									<div>{renderAvailableTimeSlots()}</div>
									<div>{renderBookedTimeSlots()}</div>
									<button
										className="bookBtn"
										onClick={handleBooking}
									>
										Book Appointment
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BookAppointment;
