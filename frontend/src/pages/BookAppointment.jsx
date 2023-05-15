import { useParams } from "react-router-dom";
import { message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/home.css';
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";

const BookAppointment = () => {
	const { doctorId } = useParams();
	const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  const stringArray = doctor.timings;
  let joinedString = '';

  if (Array.isArray(stringArray)) {
    joinedString = stringArray.join(' - ');
  }

  const getDoctor = async () => {
    try {
      const res = await axios.post('http://localhost:8000/user/getDoctor', {doctorId: doctorId}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success) {
        setDoctor(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    getDoctor();
  }, []);

  const handleTimeChange = (event) => {
      setTime(event.target.value);
  };
  const handleDateChange = (event) => {
      setDate(event.target.value);
  };

  // ================== booking function ==============
  const handleBooking = async () => {
		try{
        if (date === '' && time === '') {
          return alert("Date & Time Required");
        }
        dispatch(showLoading());
        const res = await axios.post(
          "http://localhost:8000/user/book-appointment",
          {
            doctorId: doctorId,
            userId: user._id,
            doctorInfo: doctor,
            userInfo: user,
            date: date,
            time: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.message);
        }else {
          message.error(res.data.message)
        }
      } catch (error) {
        dispatch(hideLoading());
        message.error(error.message)
      }
  }

  return (
    <div className="bookAppointment py-5">
      <h1 className="text-center pb-5">Book An Appointment</h1>
      {
        doctor && (
          <div className="row d-flex justify-content-between items-center">
            <div className="col-sm-6 mb-5">
              <h4>Dr. {doctor.name}</h4>
              <div className="d-flex justify-content-between doctor_info">
                <p className='doctor_info_title'>Consultation Fee :</p>
                <p>Tk. {doctor.consultationFee}</p>
              </div>
              <div className="d-flex justify-content-between doctor_info">
                <p className='doctor_info_title'>Consultation Timing :</p>
                <p>{joinedString}</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="book-item">
                <label htmlFor="time">Select Time <span>*</span></label>
                <input
                  type="time"
                  name="time"
                  value={time}
                  required
                  onChange={handleTimeChange}
                />
              </div>
              <div className="book-item mt-3">
                <label htmlFor="time">Select Date <span>*</span></label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  required
                  onChange={handleDateChange}
                />
              </div>
              <div className="d-flex gap-4 flex-column">
                <button className="mt-4 bookBtn" onClick={handleBooking}>Book Appointment</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default BookAppointment;