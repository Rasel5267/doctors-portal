import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

const Profile = () => {
  const {user} = useSelector(state => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post('http://localhost:8000/doctor/getDoctorInfo', {userId: params.id}, {
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
      message.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorInfo();
  }, [user])

  const onFinishHandler = async(values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('http://localhost:8000/doctor/updateProfile', {...values, userId: user._id,
      timings: [
        moment(values.timings[0]).format("HH:mm"),
        moment(values.timings[1]).format("HH:mm"),
      ]
    }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }

  return (
    <div>
      <h1 className="text-center py-3">Manage Profile</h1>
      {doctor && (
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-4 m-3' initialValues={{
          ...doctor,
          timings: [
            moment(doctor.timings[0], "HH:mm"),
            moment(doctor.timings[1], "HH:mm"),
          ],
        }}>
          <h4>Personal Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Name' name="name" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your name"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Email Address' name="email" required rules={[{required: true}]}>
                <Input type="email" placeholder="Enter your email" disabled/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Phone Number' name="phone" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your phone number"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Medical Address' name="address" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your medical address"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Medical Name' name="medical" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your medical name, where you work"/>
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Medical Education' name="education" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your medical college name"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Certifications' name="certification">
                <Input type="text" placeholder="Enter if you have any extra certification"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Specialization Area' name="specialization" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your specialization area"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Experience' name="experience" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your experience"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Consultation Fee' name="consultationFee" required rules={[{required: true}]}>
                <Input type="number" placeholder="Enter your consultation fee"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Consultation Timings' name="timings" required rules={[{required: true}]}>
                <TimePicker.RangePicker format="HH:mm"/>
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <button className='btn btn-primary' type='submit'>Update</button>
          </div>
        </Form>
      )}
    </div>
  )
}

export default Profile;