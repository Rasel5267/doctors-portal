import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import '../../styles/Sidebar.css';

const Sidebar = () => {
	const {user} = useSelector(state => state.user);

	const userMenu = [
		{
			name: 'Appointments',
			path: '/dashboard/appointments'
		},
		{
			name: 'Apply Doctor',
			path: '/dashboard/apply-doctor'
		},
		{
			name: 'Notification',
			path: '/dashboard/notification'
		},
		{
			name: 'Profile',
			path: `/dashboard/profile/${user?._id}`,
		}
	];
	
	const doctorMenu = [
		{
			name: 'Appointments',
			path: '/dashboard/appointments'
		},
		{
			name: 'Notification',
			path: '/dashboard/notification'
		},
		{
			name: 'Profile',
			path: `/dashboard/doctor/profile/${user?._id}`,
		}
	];
	
	const adminMenu = [
		{
			name: 'Doctors',
			path: '/dashboard/doctors'
		},
		{
			name: 'Users',
			path: '/dashboard/users'
		},
		{
			name: 'Notification',
			path: '/dashboard/notification'
		},
		{
			name: 'Profile',
			path: `/dashboard/profile/${user?._id}`,
		}
	];

	const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
	<div className="sidebar">
		<ul>
			{
				SidebarMenu.map(menu => (
					<li key={menu.name}>
						<NavLink to={menu.path}>{menu.name}</NavLink>
					</li>
				))
			}
		</ul>
	</div>
  )
}

export default Sidebar;