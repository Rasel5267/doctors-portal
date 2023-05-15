import { Link, useParams } from "react-router-dom";
import { message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";

const SingleDoctor = () => {
	const [doctor, setDoctor] = useState([]);
	const { singleDoctorId } = useParams();
  const stringArray = doctor.timings;
  let joinedString = '';

  if (Array.isArray(stringArray)) {
    joinedString = stringArray.join(' - ');
  }

  const getDoctor = async () => {
    try {
      const res = await axios.post('http://localhost:8000/user/getDoctor', {doctorId: singleDoctorId}, {
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

  return (
	<div className="single-doctor my-5">
		{doctor && <div className="row d-flex justify-content-between items-center singleDoctorCard">
      <div className="col-sm-6 col-xs-12 col-md-6 col-lg-6 single-doctor-details">
          <h3 className="pb-3">Dr. {doctor.name}</h3>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Medical Education :</p>
            <p>{doctor.education}</p>
          </div>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Practice Areas :</p>
            <p>{doctor.specialization}</p>
          </div>
          {doctor.certification && <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Certifications :</p>
            <p>{doctor.certification}</p>
          </div>}
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Experience :</p>
            <p>{doctor.experience}</p>
          </div>
          <h4 className="py-3">Consultation Details</h4>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Medical Name :</p>
            <p>{doctor.medical}</p>
          </div>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Medical Address :</p>
            <p>{doctor.address}</p>
          </div>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Consultation Fee :</p>
            <p>Tk. {doctor.consultationFee}</p>
          </div>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Consultation Timing :</p>
            <p>{joinedString}</p>
          </div>
          <h4 className="py-3">Contact Details</h4>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Phone :</p>
            <p>{doctor.phone}</p>
          </div>
          <div className="d-flex justify-content-between doctor_info">
            <p className='doctor_info_title'>Email :</p>
            <p>{doctor.email}</p>
          </div>
      </div>
      <div className="col-sm-6 col-xs-12 col-md-6 col-lg-6 d-flex justify-content-end mb-5">
        <img src={doctor.image} alt={doctor.name} />
      </div>
    </div>}
    <div className="d-flex items-center mt-5">
      <Link to={`/book-appointment/${singleDoctorId}`} className="bookBtn">Book Appointment</Link>
    </div>
	</div>
  )
}

export default SingleDoctor;