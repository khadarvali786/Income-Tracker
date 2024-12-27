import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Services/api';
import { userActions } from '../Store';
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies([])
  const { user } = useSelector((store) => store.user || {}); // Safeguard for undefined store.user


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async() => {
     await logoutUser();
      window.location.reload(); // Reload the page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h4>Income App</h4>
      </div>
      <h2>
        {user ? "Welcome " :' '}
       {user?.username || ''} {/* Fallback to 'Guest' if user or username is not defined */}
      </h2>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="" onClick={closeMenu}>
            Income
          </Link>
        </li>
        <li>
          <Link to="/investments" onClick={closeMenu}>
            Investment
          </Link>
        </li>
        <li>
          <Link  onClick={closeMenu}>
            Contact
          </Link>
        </li>
        {user?.status && ( // Safeguard for user.status
          <li>
            <Link  onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
