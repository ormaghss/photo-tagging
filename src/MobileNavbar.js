// MobileNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS file
import ormalogo from "./assets/img/brand/argon-react_4.png";

const MobileNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/"> <img src={ormalogo} alt="Logo" height="30" /></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Photo Tagging</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/view-all-users">View All Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user-profile">User Profile</Link>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default MobileNavbar;
