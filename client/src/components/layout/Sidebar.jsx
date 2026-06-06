import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Farmer Super App</h2>

      <nav className="nav-links">
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <NavLink to="/app/chat">AI Chat</NavLink>
        <NavLink to="/app/weather">Weather</NavLink>
        <NavLink to="/app/crop-doctor">Crop Doctor</NavLink>
        <NavLink to="/app/profile">Profile</NavLink>
        <NavLink to="/app/farm-records">Farm Records</NavLink>
        <NavLink to="/app/market">Market Prices</NavLink>
        <NavLink to="/app/community">Community</NavLink>
        <NavLink to="/app/profit-calculator">Profit Calculator</NavLink>
        <NavLink to="/app/government-schemes">Government Schemes</NavLink>
        <NavLink to="/app/marketplace">Marketplace</NavLink>
        <NavLink to="/app/admin">Admin</NavLink>
        <NavLink to="/app/crop-advisory">Crop Advisory</NavLink>
         <NavLink to="/app/learning-hub">Learning Hub</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;