import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { message } from 'antd';
import axios from "axios";
import { setUser } from "../redux/features/userSlice";
import { useEffect } from "react";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";

const Layout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {user} = useSelector(state => state.user);

	const getUser = async () => {
		dispatch(showLoading());
		try{
		const res = await axios.post('http://localhost:8000/user/getUserData', 
		{token : localStorage.getItem('token')}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});
		dispatch(hideLoading());
		if(res.data.success) {
			dispatch(setUser(res.data.data))
		} else {
			navigate('/login');
		}
		} catch (error) {
			dispatch(hideLoading());
			message.error(error.message);
		}
	}

	useEffect(() => {
		if(!user) {
			getUser();
		}
	}, [user])

  return (
	<>
		<Navbar />
		<Outlet />
		<Footer />
	</>
  )
}

export default Layout;