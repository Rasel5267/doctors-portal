import { message } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";
import DoctorCard from '../components/DoctorCard';
import Banner from '../components/Banner';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
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
    <div className='home mb-5'>
      <Banner />
      <h2 className='text-center my-5'>Meet Our Dedicated Doctor’s Team</h2>
      <div className='row'>
        {doctors && doctors.map(doctor => (
          <DoctorCard doctor={doctor} key={doctor._id}/>
        ))}
      </div>
    </div>
  )
}

export default Home;