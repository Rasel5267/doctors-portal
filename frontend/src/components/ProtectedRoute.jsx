import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	let auth = localStorage.getItem('token');

	return(
		auth ? <Outlet /> : <Navigate to='/login' />
	)
}

export default ProtectedRoute;