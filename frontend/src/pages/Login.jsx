import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async(values) => {
    dispatch(showLoading());
    try{
      const res = await axios.post('http://localhost:8000/user/login', values);
      dispatch(hideLoading());
      if(res.data.success) {
        localStorage.setItem('token', res.data.token);
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
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-4'>
          <h1>Login Form</h1>
          <Form.Item label='Email' name='email'>
            <Input type='email' required />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' required />
          </Form.Item>
          <button className='btn btn-primary' type='submit'>Login</button>
          <p className='mt-3 text-end'>Don&rsquo;t have an account? <Link to='/register'>Register</Link></p>
        </Form>
      </div>
    </>
  )
}

export default Login