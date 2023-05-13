import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	let auth = localStorage.getItem('token');
	return(
		auth ? <Navigate to='/' /> : <Outlet />
	)
}

export default PublicRoute;