import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h4>Income App</h4>
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu} >Home</Link></li>
        <li><Link href="" onClick={closeMenu}>Income</Link></li>
        <li><Link to="/investments" onClick={closeMenu} >Investment</Link></li>
        <li><a href=""onClick={closeMenu} >Contact</a></li>
      </ul>
      <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
    </nav>
  );
};

export default Navbar;
