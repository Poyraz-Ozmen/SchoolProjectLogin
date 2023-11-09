import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import EasyEdit from 'react-easy-edit';



const AdminPage = () => {



  const [data, setData] = useState([]);

  useEffect(() => {
    // Create an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/users");
        console.log("JSON data from API ==>", response.data);
        setData(response.data);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching data:", error);
      }
    };

    // Call the asynchronous function to fetch data
    fetchData();
  }, []);

  // HANDLE DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/users/" + id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserNameChange = async (newUsername, user) => {
    try {
      //console.log(newUsername)
      //console.log(user.idUser)
      const oldUsername = user.username
      await axios.put(`http://localhost:8800/admin/${user.idUser}/${newUsername}/${oldUsername}`)
      //window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const save = (user) => (value) => {
    // Now `user` is accessible within the save function
    console.log(`User ID: ${user.username}`);
    console.log(`New Value: ${value}`);
    handleUserNameChange(value, user)
    // Wait for half a second (500 milliseconds)
    setTimeout(() => {
      // Code to execute after the delay
      window.location.reload()
      // console.log("Half a second has passed");
    }, 100);

  }


  const cancel = () => {
    // do nothing
    //alert("Cancelled") 
  }



  /* SEARCH FUNCTION *******************************************************************/
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersFound, setUsersFound] = useState(true);


  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = data.filter((user) => user.username.toLowerCase().includes(query));
    setFilteredUsers(filtered);
    setUsersFound(filtered.length > 0); // Set usersFound based on the filtered array
  }, [searchQuery, data]);


  /*************************************************************************************/



  /*Visible Content *******************************************************************/
  const [isContentVisible, setIsContentVisible] = useState(Array(data.length).fill(false));

  const handleToggleContent = (index) => {
    const newVisibility = [...isContentVisible];
    newVisibility[index] = !newVisibility[index];
    setIsContentVisible(newVisibility);
  }
  /*************************************************************************************/
  const handleClickLogOut = () => {
    console.log("clicked log out")
    //setUser({ idUser: null, username: '', password: '', isAdmin: 0 }); // user goes to default
    //console.log(user)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/admin/add/course" style={{ color: 'darkblue' }}><u>Click Here to Add Course</u></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <a className="nav-link mx-2 active" aria-current="page" href="/admin">Home</a>
              </li>

            </ul>
            <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
              <li className="nav-item">
                <a className="nav-link mx-2 active" aria-current="page" href="/" onClick={handleClickLogOut}>Log Out</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid mt-5 ">


        <div className="container-fluid p-5 bg-primary text-white text-center">
          <h1>Search User </h1>

          {/* <Link to="/admin/add/course" style={{ backgroundColor: 'black', color: 'yellow' }} > Click Here to go add course</Link> */}
          {/* <p>Resize this responsive page to see the effect!</p> */}



          <form class="d-flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control me-2"
              placeholder="Search User"
            />
            {/* <button class="btn btn-primary" type="button" onClick={handleSearch}>Search</button> */}
          </form>
        </div>



        {usersFound ? (
          (filteredUsers.length === 0 ? data : filteredUsers).map((user, index) => (
            <div className="col-sm-3 d-inline-flex p-4 flex-wrap align-content-around" key={user.id}>
              <div className="card user-container my-5 border">
                {/* User data rendering */}
                {user.isAdmin === 1 ? (
                  <div className="card-body ">
                    <img src={require(`../uploadstest/admin_image.jpeg`)} className="card-img-top" />
                    <p>{`User ID: ${user.idUser}`}</p>
                    <p>{`Username: ${user.username}`}</p>
                  </div>
                ) : (
                  <div className="card-body">
                    <img src={require(`../uploadstest/${user.username}_image.jpeg`)} className="card-img-top" />
                    <p>{`User ID: ${user.idUser}`}</p>
                    <EasyEdit
                      type="text"
                      onSave={save(user)}
                      onCancel={cancel}
                      value={`Username: ${user.username}`}
                      saveButtonLabel="Save"
                      cancelButtonLabel="Cancel"
                      attributes={{ name: "awesome-input", id: 1 }}
                    />
                    <button type="button" className="btn btn-primary" onClick={() => handleToggleContent(index)}>
                      Show Information
                    </button>
                    {isContentVisible[index] && (
                      <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                      </div>
                    )}
                    <button className="btn btn-danger" onClick={() => handleDelete(user.idUser)} style={{ marginLeft: '10px', backgroundColor:'orange' }}>
                      DELETE
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No users found with that username</p>
        )}

      </div>
    </>
  );
}

export default AdminPage


