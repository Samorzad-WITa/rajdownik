import React, { useEffect, useState } from "react";
import axios from "axios";
import participants from "./assets/icons/participants.svg";
import announcements from "./assets/icons/anouncements.svg";
import schedule from "./assets/icons/schedule.svg";
import staff from "./assets/icons/staff.svg";
import setting from "./assets/icons/settings.svg";
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getlogin = async () => {
    try {
      const response = await axios.post('http://localhost:1133/auth/login', {
        email: 'dominik.pokrzywa@gmail.com',
        password: '123'
      });
      const token = response.data.token;
      setToken(token);
      return token;
    } catch (error) {
      console.error('Błąd podczas logowania:', error.response ? error.response.data : error.message);
    }
  };

  const getUser = async (token) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    try {
      const response = await axios.get('http://localhost:1133/user', config);
      setUser(response.data[22]);
    } catch (error) {
      console.error('Błąd podczas uzyskiwania użytkownika:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getlogin();
      if (token) {
        await getUser(token);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const navButtons = [
    { path: "/participants", label: "Uczestnicy", icon: participants },
    { path: "/announcements", label: "Ogłoszenia", icon: announcements },
    { path: "/schedule", label: "Harmonogram", icon: schedule },
    { path: "/staff", label: "Sztab", icon: staff },
    { path: "/settings", label: "Ustawienia", icon: setting },
  ];

  return (
    <div className="navbar">
      {navButtons.map(({ path, label, icon }) => (
        <a
          key={path}
          className={`nav-button ${location.pathname === path ? 'active' : ''}`}
          href={path}
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <img src={icon} alt={label} />
          {label}
        </a>
      ))}
      <h3 className="navUser">{user.firstName} {user.lastName}</h3>
      <h3 className="navEmail">{user.email || 'testEmail@test.pl'}</h3>
      <button className="logoutButton" onClick={handleLogout}>
        Wyloguj
      </button>
    </div>
  );
}

export default Navbar;
