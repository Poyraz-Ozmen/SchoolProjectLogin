import React, { useState, useEffect } from 'react';
// 
import axios from 'axios'

const AdminAddCourse = ({user, setUser}) => {

    // const navigate = useNavigate();

    const [courseName, setCourseName] = useState('');
    const [shortName, setShortName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [day, setDay] = useState('Monday');
    const [startHour, setStartHour] = useState('8:30');
    const [duration, setDuration] = useState('2');

    const loadExternalStylesheets = () => {
        const linkBootstrap = document.createElement('link');
        linkBootstrap.href = 'https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css';
        linkBootstrap.rel = 'stylesheet';
        document.head.appendChild(linkBootstrap);

        const linkCommentForm = document.createElement('link');
        linkCommentForm.href = 'https://unpkg.com/bs-brain@2.0.2/components/comments-forms/comment-form-1/assets/css/comment-form-1.css';
        linkCommentForm.rel = 'stylesheet';
        document.head.appendChild(linkCommentForm);
    };

    useEffect(() => {
        loadExternalStylesheets();

        const linkCSS = document.createElement('link');
        linkCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
        linkCSS.rel = 'stylesheet';
        document.head.appendChild(linkCSS);

        const scriptJS = document.createElement('script');
        scriptJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
        scriptJS.integrity = 'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p';
        scriptJS.crossOrigin = 'anonymous';
        document.body.appendChild(scriptJS);

        // Cleanup when the component unmounts
        return () => {
            document.head.removeChild(linkCSS);
            document.body.removeChild(scriptJS);
        };


    }, [user.username]);





    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let tempHour = "";
        let resultHour = "";

        if (startHour[2] === ":") {
            tempHour = `${(+(startHour.slice(0, 2)) + 2)}:30`;
            resultHour = startHour + '-' + tempHour;
        } else if (startHour[1] === ":") {
            tempHour = `${(+(startHour.slice(0, 1)) + 2)}:30`;
            resultHour = startHour + '-' + tempHour;
        }

        // Create the data object to be sent as JSON
        const jsonData = {
            courseName,
            shortName,
            capacity,
            courseDescription,
            day,
            resultHour,
        };

        try {
            // Send a POST request with JSON data
            await axios.post('http://localhost:8800/admin/course/add', jsonData, {
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
            });
            console.log('Form data submitted:', jsonData);
            // navigate('/admin');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleClickLogOut = () =>{
        console.log("clicked log out")
        setUser({ idUser: null, username: '', password: '', isAdmin: 0 }); // user goes to default
        console.log(user)
    }



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





            <section className="bg-light py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                            <h2 className="mb-4 display-5 text-center">Add Course Form</h2>
                            <p className="text-secondary mb-5 text-center">Add a course for your desire</p>
                            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-12 col-lg-9">
                            <div className="bg-white border rounded shadow-sm overflow-hidden">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="courseName" className="form-label">
                                                Course Name <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="courseName"
                                                    value={courseName}
                                                    onChange={(e) => setCourseName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="shortName" className="form-label">
                                                Short Name <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="shortName"
                                                    value={shortName}
                                                    onChange={(e) => setShortName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="capacity" className="form-label">
                                                Capacity <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="capacity"
                                                    value={capacity}
                                                    onChange={(e) => setCapacity(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="startHour" className="form-label">
                                                Start Time: <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="form-select"
                                                aria-label="Select a start time"
                                                value={startHour}
                                                onChange={(e) => setStartHour(e.target.value)}
                                            >
                                                <option value="8:30">8:30</option>
                                                <option value="9:30">9:30</option>
                                                <option value="10:30">10:30</option>
                                                <option value="11:30">11:30</option>
                                                <option value="12:30">12:30</option>
                                                <option value="13:30">13:30</option>
                                                <option value="14:30">14:30</option>
                                                <option value="15:30">15:30</option>
                                                <option value="16:30">16:30</option>
                                                <option value="17:30">17:30</option>
                                                <option value="18:30">18:30</option>
                                                <option value="19:30">19:30</option>
                                                <option value="20:30">20:30</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="duration" className="form-label">
                                                Duration in hours: <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="form-select"
                                                aria-label="Select a duration"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            >
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <label htmlFor="duration" className="form-label">
                                                Day: <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="form-select"
                                                aria-label="Select a duration"
                                                value={day}
                                                onChange={(e) => setDay(e.target.value)}
                                            >
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="courseDescription" className="form-label">
                                                Course Description <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="courseDescription"
                                                rows="3"
                                                value={courseDescription}
                                                onChange={(e) => setCourseDescription(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-primary btn-lg" type="submit" href="/admin">
                                                    Create New Course
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}

export default AdminAddCourse;