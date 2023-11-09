import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./css/userpage.css";

const Login = ({ user, setUser }) => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    // Create an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/users");
        //console.log("JSON data from API ==>", response.data);
        setData(response.data);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    // Call the asynchronous function to fetch data
    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setUser({ ...user, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const adminChange = (element) => {
    setUser({ ...user, isAdmin: element.isAdmin });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log("user from submit: ", user);
      const response = await axios.get(`http://localhost:8800/login/${user.username}/${user.password}`);
      console.log("response data from login: ", response.data);

      let isAdmin = 0; // Initialize isAdmin to a default value

      for (const element of data) {
        if (element.username === user.username) {
          isAdmin = element.isAdmin; // Update isAdmin based on user data
          break; // Exit the loop once you've found the user
        }
      }

      // Now, set the user state with the correct isAdmin value
      setUser({ ...user, isAdmin: isAdmin });


      if (response.data === "Login successful") {

        localStorage.setItem('userData', JSON.stringify(user));

        if (isAdmin === 0) {
          navigate('/user');
        } else {
          navigate('/admin');
        }
      }
    } catch (error) {
      // Handle errors
    }
  };


  return (
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
                      <h4 className="mb-4 pb-3">Log In</h4>
                      <div className="form-group">
                        <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off"
                          value={user.username}
                          onChange={handleUsernameChange}
                        />
                        <i className="input-icon uil uil-at"></i>
                      </div>
                      <div className="form-group mt-2">
                        <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off"
                          value={user.password}
                          onChange={handlePasswordChange}
                        />
                        <i className="input-icon uil uil-lock-alt"></i>
                      </div>
                      <button  className="btn mt-4" onClick={handleClick}>submit</button>
                      {/* <p class="mb-0 mt-4 text-center"><a href="#0" class="link">Forgot your password?</a></p> */}
                      <Link to="/signup"> Do not have an account? Sign up here</Link>
    
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


     
  );
}

export default Login


