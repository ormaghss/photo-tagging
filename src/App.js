// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import PhotoTagging from './PhotoTagging';
import UserData from './UserData';
import Profile from './Profile';

const App = () => {
  return (
    <Router>
    <div>
      <MobileNavbar />

      <Routes>
        <Route path="/" element={<PhotoTagging />} />
        <Route path="/view-all-users" element={<UserData />} />
        <Route path="/user-profile" element={<Profile />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
