// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	// const {user} = useSelector(state => state.user);
	let auth = localStorage.getItem('token');

	if(auth) {
		<Navigate to='/'></Navigate>
	}

	// const authentication = auth && user.status === 'approved'

	return(
		auth ? <Outlet /> : <Navigate to='/login' />
	)
}

export default ProtectedRoute;