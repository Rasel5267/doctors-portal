import { Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from 'react';

const ApplyDoctor = () => {
  const {user} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    if (name === 'start') {
      setStartTime(value);
    } else if (name === 'end') {
      setEndTime(value);
    }
  };

  const onFinishHandler = async(values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('http://localhost:8000/user/apply-doctor', {...values, userId: user._id,
      timings: [startTime, endTime]
    }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }

  return (
    <div className="apply-doctor">
      <h1 className="text-center py-3">Apply Doctor</h1>
      <Form layout='vertical' onFinish={onFinishHandler} className='card p-4 m-3'>
        <h4>Personal Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Name' name="name" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your name"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Email Address' name="email" required rules={[{required: true}]}>
                <Input type="email" placeholder="Enter your email"/>
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
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Image URL' name="image" required rules={[{required: true}]}>
                <Input type="text" placeholder="Enter your image Url"/>
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
              <Form.Item label='Consultation Start Timings' required rules={[{required: true}]}>
                <Input
                  type="time"
                  name="start"
                  value={startTime}
                  onChange={handleTimeChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Consultation End Timings' required rules={[{required: true}]}>
                <Input
                  type="time"
                  name="end"
                  value={endTime}
                  onChange={handleTimeChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            { user?.isVerified ? <button className='btn btn-primary' type='submit'>Submit</button> : <p>Please Verify your Account First <Link to='/verify-account'>Verify</Link></p>}
          </div>
        </Form>
    </div>
  )
}

export default ApplyDoctor;