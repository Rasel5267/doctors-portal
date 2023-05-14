import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const {user} = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      const res = await axios.post('http://localhost:8000/user/getUserInfo', {userId: params.id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success) {
        setUserInfo(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [user]);

  const onFinishHandler = async(values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('http://localhost:8000/user/updateProfile', {...values, userId: user._id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
        location.reload();
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
      {userInfo && (
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-4' initialValues={userInfo}>
          <Form.Item label='Name' name='name'>
            <Input type='text' required />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input type='email' required disabled/>
          </Form.Item>
          <button className='btn btn-primary' type='submit'>Update</button>
        </Form>
      )}
    </div>
  )
}

export default UserProfile;