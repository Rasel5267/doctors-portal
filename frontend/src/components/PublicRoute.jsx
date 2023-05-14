import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

const PublicRoute = () => {
	let auth = localStorage.getItem('token');
	// const {user} = useSelector(state => state.user);
	// const authentication = auth && user.status === 'approved'
	return(
		auth ? <Navigate to='/' /> : <Outlet />
	)
}

export default PublicRoute;