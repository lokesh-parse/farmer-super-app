import { useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../../utils/auth";
import { getLanguage, saveLanguage } from "../../utils/language";

function Topbar() {
  const navigate = useNavigate();
  const user = getUser();
  const selectedLanguage = getLanguage();

  const handleLogout = () => {
    removeUser();
    navigate("/auth");
  };

  const handleLanguageChange = (e) => {
    saveLanguage(e.target.value);
    window.location.reload();
  };

  return (
    <header className="topbar">
      <div>
        <h1>Farmer Super App</h1>
        <p>Startup-grade agriculture platform</p>
      </div>

      <div className="topbar-right">
        <select
          className="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="English">English</option>
          <option value="Hindi">हिंदी</option>
          <option value="Marathi">Marathi</option>
        </select>

        <span className="topbar-user">
          {user ? `Hi, ${user.name}` : "Guest"}
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;