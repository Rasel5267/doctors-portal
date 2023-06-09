import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import DashboardLayout from "./common/DashboardLayout";
import {
	Dashboard,
	Error,
	Home,
	Login,
	Notification,
	Register,
	SingleDoctor,
	ApplyDoctor,
	Appointments,
	Doctors,
	Profile,
	Users,
	UserProfile,
	BookAppointment,
	DoctorAppointment,
	VerifyAccount,
} from "./pages";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
	const { loading } = useSelector((state) => state.alerts);

	return (
		<BrowserRouter>
			{loading ? (
				<Spinner />
			) : (
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<Layout />}>
							<Route path="/" element={<Home />} />
							<Route
								path="/verify-account"
								element={<VerifyAccount />}
							/>
							<Route
								path="/doctor/:singleDoctorId"
								element={<SingleDoctor />}
							/>
							<Route
								path="/book-appointment/:doctorId"
								element={<BookAppointment />}
							/>
							<Route path="*" element={<Error />} />
							<Route
								path="/dashboard"
								element={<DashboardLayout />}
							>
								<Route path="" element={<Dashboard />} />
								<Route
									path="/dashboard/notification"
									element={<Notification />}
								/>
								<Route
									path="/dashboard/apply-doctor"
									element={<ApplyDoctor />}
								/>
								<Route
									path="/dashboard/appointments"
									element={<Appointments />}
								/>
								<Route
									path="/dashboard/doctor/appointments"
									element={<DoctorAppointment />}
								/>
								<Route
									path="/dashboard/doctors"
									element={<Doctors />}
								/>
								<Route
									path="/dashboard/users"
									element={<Users />}
								/>
								<Route
									path="/dashboard/user/profile/:id"
									element={<Profile />}
								/>
								<Route
									path="/dashboard/doctor/profile/:id"
									element={<Profile />}
								/>
								<Route
									path="/dashboard/profile/:id"
									element={<UserProfile />}
								/>
							</Route>
						</Route>
					</Route>
					<Route element={<PublicRoute />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>
				</Routes>
			)}
		</BrowserRouter>
	);
};

export default App;
