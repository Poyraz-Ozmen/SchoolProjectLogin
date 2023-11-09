import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./css/userpage.css";





let count = 0


const SignUp = ({ user, setUser, image, setImage }) => {

  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUser({ ...user, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //await handleID(); // Wait for handleID to complete and update the user state
      console.log("user from submit: ", user);
      await axios.post("http://localhost:8800/signup", user);

      try {
        await axios.post(`http://localhost:8800/users/course/${user.username}`);
        navigate("/") // go to home (login) page after sign up
      } catch (error) {
        
      }
      // navigate("/") // go to home (login) page after sign up
    } catch (error) {
      // Handle errors
    }
  }

  useEffect(() => {
    // Create an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/count");
        //console.log("JSON data from API ==>", response.data[0]["COUNT(*)"]);
        count = response.data[0]["COUNT(*)"]

      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    // Call the asynchronous function to fetch data
    fetchData();
  }, []);

  const fileInputRef = useRef();

  const handleImage = () => {
    fileInputRef.current.click();
  };


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  // Frontend code (React)
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const newFileName = `${user.username}_image.jpeg`

    // Use the setUser callback to update the state based on the previous state
    // setUser((prevUser) => ({...prevUser, idUser: count + 1,
    // }));

    // Create a new File object with the desired name
    const modifiedFile = new File([selectedFile], newFileName, { type: selectedFile.type });
    const formData = new FormData();
    formData.append('file', modifiedFile);


    // Create a POST request using Axios with the correct URL
    axios.post('http://localhost:8800/upload', formData)
      .then((response) => {
        console.log(response.data); // Response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };







  return (
    // <div className='form'>
    //   <h1>Sign Up Page</h1>
    //   <input type="text" placeholder='username' name="username" onChange={handleUsernameChange} />
    //   <input type="password" placeholder='password' name="password" onChange={handlePasswordChange} />

    //   <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleImage}>
    //     Upload Picture
    //   </Button>
    //   <input
    //     type="file"
    //     accept="image/*"
    //     ref={fileInputRef}
    //     style={{ display: 'none' }}
    //     onChange={handleFileChange}
    //   />


    //   <button type='submit' onClick={handleClick}>Submit</button>
    // </div>

    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">

                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off"
                            onChange={handleUsernameChange}
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off"
                            onChange={handlePasswordChange}
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button component="label" className="btn mt-4" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleImage}>
                          Upload Picture
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                        <button href="#" className="btn mt-4" onClick={handleClick}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;


