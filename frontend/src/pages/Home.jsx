import { Row, message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";
import DoctorCard from '../components/DoctorCard';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  console.log(doctors);
  const getDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8000/user/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success) {
        setDoctors(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className='home'>
      <h2 className='text-center mt-5'>Meet Our Dedicated Doctor’s Team</h2>
      <Row>
        {doctors && doctors.map(doctor => (
          <DoctorCard doctor={doctor} key={doctor._id}/>
        ))}
      </Row>
    </div>
  )
}

export default Home;