import React, { useState } from 'react';
import Login from './pages/Login'; // Assume you have a Login component
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import UserCoursePage from './pages/UserCoursePage';
import AdminAddCourse from './pages/AdminAddCourse';
// import "./style.css";

function App() {
  // Define the user state and its update functions in the common ancestor component (App)
  const [user, setUser] = useState({ idUser: null, username: '', password: '', isAdmin: 0 });
  const [image, setImage] = useState({});




  return (

    /* Pass the user state and setUser function as props to the Login component */

    <Router>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} />} />

        <Route path="/user" element={<UserPage user={user} setUser={setUser} />} />
        <Route path="/admin" element={<AdminPage user={user} setUser={setUser} />} />
        <Route path="/admin/add/course" element={<AdminAddCourse user={user} setUser={setUser} />} />
        <Route path="/signup" element={<SignUp user={user} setUser={setUser} image={image} setImage={setImage} />} />
        <Route path="/user/course" element={<UserCoursePage user={user} setUser={setUser} />} />
      </Routes>

    </Router>
  );
}

export default App;
