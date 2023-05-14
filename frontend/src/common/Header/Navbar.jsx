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

	const conditionOne = !user?.isAdmin;
	const conditionTwo = !user?.isDoctor;
  return (
	<div className="navbar">
		<Link to='/' className="logo">DocPortal</Link>
		<nav>
			<ul className={menu ? 'active' : ''}>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/about'>About Us</NavLink>
				</li>
				<li>
					<NavLink to='/contact'>Contact Us</NavLink>
				</li>
				{(conditionOne && conditionTwo) && <NavLink to='/dashboard/apply-doctor'>Apply Doctor</NavLink>}
				<li className='closeMenu'>
					<MdOutlineClose onClick={() => setMenu(false)}/>
				</li>
			</ul>
			<div className="profile">
				<div className='notification'>
					<NavLink to='/dashboard/notification'><MdNotifications /> <span>{user?.notification.length}</span></NavLink>
				</div>
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