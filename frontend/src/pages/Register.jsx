import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import '../styles/Auth.css';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async(values) => {
    dispatch(showLoading());
    try{
      const res = await axios.post('http://localhost:8000/user/register', values);
      dispatch(hideLoading());
      if(res.data.success) {
        message.success(res.data.message);
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }
  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-4'>
          <h1>Register Form</h1>
          <Form.Item label='Name' name='name'>
            <Input type='text' required />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input type='email' required />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' required />
          </Form.Item>
          <button className='btn btn-primary' type='submit'>Register</button>
          <p className='mt-3 text-end'>Already have an account? <Link to='/login'>Login</Link></p>
        </Form>
      </div>
    </>
  )
}

export default Register;