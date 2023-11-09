import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserCoursePage = ({ user, setUser }) => {
    const [course_data, setData] = useState([]);
    const [user_data, setUserData] = useState([]);
    const [registered_courses, setRegisteredCourses] = useState([]);
    //const [registered_courses_time, setRegisteredCoursesTime] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8800/users/course");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            if (user.username !== "") {
                try {
                    const response_two = await axios.get(`http://localhost:8800/users/course/registered/${user.username}`);
                    setUserData(response_two.data);
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            } else {
                const storedUserData = JSON.parse(localStorage.getItem('userData'));
                if (storedUserData && storedUserData.username !== "") {
                    setUser(storedUserData);
                    try {
                        const response_two = await axios.get(`http://localhost:8800/users/course/registered/${storedUserData.username}`);
                        setUserData(response_two.data);

                        const courses = [];
                        //const course_time = {};
                        for (const key in response_two.data[0]) {
                            if (response_two.data[0][key] === 1) {
                                courses.push(key);
                            }
                        }
                        setRegisteredCourses(courses);
                    } catch (err) {
                        console.error("Error fetching data:", err);
                    }
                }
            }
            setIsLoading(false);
        };

        fetchData();
    }, [user.username]);

    // register user to course
    const handleRegister = async (user, course) => {
        try {
            await axios.post(`http://localhost:8800/users/course/register/${user.username}/${course.shortname}`);
            try {
                await axios.put(`http://localhost:8800/users/course/register/${course.shortname}`);
                localStorage.setItem('userData', JSON.stringify(user));
                setRegisteredCourses((prevCourses) => [...prevCourses, course.shortname.toLowerCase()]);
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // drop course from user
    const handleDrop = async (user, course) => {
        try {
            await axios.post(`http://localhost:8800/users/course/drop/${user.username}/${course.shortname}`);
            try {
                await axios.put(`http://localhost:8800/users/course/drop/${course.shortname}`);
                localStorage.setItem('userData', JSON.stringify(user));

                // Remove the dropped course from the registered_courses state
                setRegisteredCourses((prevCourses) => prevCourses.filter((c) => c !== course.shortname.toLowerCase()));

                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleClickLogOut = () => {
        setUser({ idUser: null, username: '', password: '', isAdmin: 0 });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-info p-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Add Course Page</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                <a className="nav-link mx-2 active" aria-current="page" href="/user">Home</a>
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
            <body>
                {/* <div className="text-center">
                    <h1 className="text-success">Choose Course</h1>
                </div> */}
                <br />
                <div className="row row-cols-2 row-cols-md-2">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        course_data.map((course) => (
                            <div className="col" key={course.shortname}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Name: {course.fullname}
                                            <span> Shortname: ({course.shortname}) </span>
                                            <span className="card-text">Day: {course.day} Hour: {course.hour}   </span>
                                        </h5>
                                        <p className="card-text">Description: {course.description}</p>
                                        <p className="card-text">
                                            Capacity: {course.capacity} <span>Total Registered: {course.registered}</span>
                                        </p>
                                        {course.registered < course.capacity ? (
                                            registered_courses.includes(course.shortname.toLowerCase()) ? (
                                                <>
                                                    <button
                                                        className="btn btn-outline-success bg-image hover-overlay"
                                                        style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', width: '300px' }}
                                                    >
                                                        Already Registered: {course.shortname}
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger bg-image hover-overlay"
                                                        style={{ backgroundColor: 'orange', marginLeft: '10px', width: '300px' }}
                                                        onClick={() => handleDrop(user, course)}
                                                    >
                                                        Drop Course
                                                    </button>
                                                </>



                                            ) : (
                                                <button
                                                    className="btn btn-outline-success bg-image hover-overlay"
                                                    style={{ backgroundColor: 'aqua', width: '300px' }}
                                                    onClick={() => handleRegister(user, course)}
                                                >
                                                    Click here to register
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-outline-danger"
                                                disabled
                                                style={{ backgroundColor: 'red', color: 'white', width: '300px' }}
                                            >
                                                Capacity Full
                                            </button>
                                        )}
                                        <br />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </body>
        </>
    );
}

export default UserCoursePage;
