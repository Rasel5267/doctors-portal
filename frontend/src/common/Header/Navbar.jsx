import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdNotifications, MdOutlineSupervisedUserCircle, MdOutlineClose } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';

import '../../styles/Navbar.css';
import { useState } from 'react';

const Navbar = () => {
	const navigate = useNavigate();
	const {user} = useSelector(state => state.user);
	const [showProfile, setShowProfile] = useState(false);
	const [menu, setMenu] = useState(false);

	const handleMenu = () => {
		setShowProfile(false);
		setMenu(true);
	}

	const handleLogout = () => {
		localStorage.clear();
		navigate('/login');
		location.reload();
	}
  return (
	<div className="navbar">
		<Link to='/' className="logo">DocPortal</Link>
		<nav>
			<ul className={menu ? 'active' : ''}>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/doctors'>Doctors</NavLink>
				</li>
				<li>
					<NavLink to='/about'>About Us</NavLink>
				</li>
				<li>
					<NavLink to='/contact'>Contact Us</NavLink>
				</li>
				<li className='closeMenu'>
					<MdOutlineClose onClick={() => setMenu(false)}/>
				</li>
			</ul>
			<div className="profile">
				{
					user?.isAdmin ? 
					<div className='notification'>
						<NavLink to='/dashboard/notification'><MdNotifications /></NavLink>
						<span>{user.notification.length}</span>
					</div>
					:
					<li>
						<NavLink to='/dashboard/apply-doctor'>Apply Doctor</NavLink>
					</li>
				}
				<span className='profile-icon' onClick={() => setShowProfile(!showProfile)}><MdOutlineSupervisedUserCircle /><span>{user?.name}</span></span>
				<div className={showProfile ? "profile-card active" : "profile-card"}>
					<Link to='/dashboard' onClick={() => setShowProfile(false)}>Dashboard</Link>
					<span onClick={handleLogout}>Logout</span>
				</div>
			</div>
			<span className='menuToggle'><BiMenu onClick={handleMenu}/></span>
		</nav>
	</div>
  )
}

export default Navbar;