import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { adminMenu, userMenu } from "./Data";

import '../../styles/Sidebar.css';

const Sidebar = () => {
	const {user} = useSelector(state => state.user);
	const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;
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