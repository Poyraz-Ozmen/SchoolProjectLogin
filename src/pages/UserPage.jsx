import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import "./css/navbar.css";
import Schedule from './Schedule';
import { Navbar, Nav } from 'react-bootstrap';


const UserPage = ({ user, setUser }) => {

  if (user.username === "") {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log(storedUserData)
    if (storedUserData) {
      setUser(storedUserData);
    }

  }

  const imageSrc = `../uploadstest/${user.username}_image.jpeg`;
  //const imageSrc = `uploadstest/${user.username}_image.jpeg`;

  useEffect(() => {

    if (user.username === "") {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      console.log(storedUserData)
      if (storedUserData) {
        setUser(storedUserData);
      }
    }

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId);
      const nav = document.getElementById(navId);
      const bodypd = document.getElementById(bodyId);
      const headerpd = document.getElementById(headerId);

      //const imageSrc = `../uploadstest/${user.username}_image.jpeg`;
      //const imageSrc = `uploadstest/${user.username}_image.jpeg`;
      //const imageSrc = `${process.env.PUBLIC_URL}/uploadstest/${user.username}_image.jpeg`;
      //localStorage.setItem('userImageSrc', imageSrc);

      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
          nav.classList.toggle('show');
          toggle.classList.toggle('bx-x');
          bodypd.classList.toggle('body-pd');
          headerpd.classList.toggle('body-pd');
        });
      }
    }

    

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

    const linkColor = document.querySelectorAll('.nav_link');

    function colorLink() {
      if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink));
  }, []);


  const handleClickLogOut = () => {
    console.log("clicked log out")
    setUser({ idUser: null, username: '', password: '', isAdmin: 0 }); // user goes to default
    console.log(user)
    //localStorage.clear();
  }

  return (
    <>
      <nav class="navbar navbar-dark navbar-expand-md navigation-clean-search">
        <div class="container">

          <button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse"
            id="navcol-1">
            <ul class="nav navbar-nav">
            {/* <img src={(`../uploadstest/${user.username}_image.jpeg`)} alt="" />
            <a class="nav-link active" ><img src={imageSrc} alt='logo'/></a> */}
              {/* <li class="nav-item" role="presentation"><a class="nav-link active" href="#">Link</a></li>
              <li class="dropdown"><a class="dropdown-toggle nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">Dropdown </a>
                <div class="dropdown-menu" role="menu"><a class="dropdown-item" role="presentation" href="#">First Item</a><a class="dropdown-item" role="presentation" href="#">Second Item</a><a class="dropdown-item" role="presentation" href="#">Third Item</a></div>
              </li> */}
            </ul>
            <form class="form-inline mr-auto" target="_self">
              {/* <Link to="/user/course"> GO TO COURSE PAGE</Link> */}
              <a class="btn btn-primary" role="button" href='/user/course'>ADD COURSE</a>
            </form>
            <a class="navbar-brand" style={{alignItems:'center', marginRight: '500px'}}> User: {user.username}</a>
            <span class="navbar-text"> </span>
            <a class="btn btn-light action-button" role="button" onClick={handleClickLogOut} href='/'>Logout</a>
          </div>
        </div>
      </nav>



      <div className="schedule-container" style={{ background: 'white', flexGrow: 1 }}>
        {/* <h4>Student information</h4>
        <h2>username: {user.username}</h2>
        <img src={(`../uploadstest/${user.username}_image.jpeg`)} alt="" />
        <br /> */}


        <Schedule user={user} />
        
      </div>
    </>
  );
}

export default UserPage;



/**
 * 
 
<div class="l-navbar" id="nav-bar">
        <nav class="nav">
          <div>
            <a href="#" class="nav_logo"><i class="fas fa-angry"></i> <span class="nav_logo-name">Example</span> </a>
            <div class="nav_list">
              <a href="#" class="nav_link active"> <i class="fab fa-angellist"></i> <span class="nav_name">Dashboard</span> </a>
              <a href="#" class="nav_link"> <i class="fas fa-anchor"></i> <span class="nav_name">Stats</span> </a>
              <a class="nav_link nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-award"></i> <span class="nav_name">Dropdown</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
          </div>
          <a href="#" class="nav_link">
            <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span>
          </a>
        </nav>
      </div>


 */