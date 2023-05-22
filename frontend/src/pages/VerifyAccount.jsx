import { Form, Input, message } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const VerifyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  const onFinishHandler = async(values) => {
    const { otp } = values;
    dispatch(showLoading());
    try{
      const res = await axios.post('http://localhost:8000/user/verify', {otp, userId: user._id});
      dispatch(hideLoading());
      if(res.data.success) {
        message.success(res.data.message);
        navigate('/');
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
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-4'>
          <h1>Verify Account</h1>
          <Form.Item label='OTP' name='otp'>
            <Input type='text' required />
          </Form.Item>
          <button className='btn btn-primary' type='submit'>Submit</button>
        </Form>
      </div>
    </>
  )
}

export default VerifyAccount;