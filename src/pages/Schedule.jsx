import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseSchedule from './CourseSchedule'; // Import the CourseSchedule component




const Schedule = ({ user }) => {
    const [course_data, setData] = useState([]);
    const [all_courses, setCourseData] = useState([]);

    const [registered_courses, setRegisteredCourses] = useState([]);
    const courses = [];

    const [union, setUnion] = useState([])
    const union_list = []

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/users/course/registered/${user.username}`);
                console.log("JSON data from response ONE (Schedule.jsx) ==>", response.data);
                setData(response.data);

                try {
                    const response_two = await axios.get(`http://localhost:8800/users/course`);
                    console.log("JSON data from response TWO (Schedule.jsx) ==>", response_two.data);
                    setCourseData(response_two.data);

                    // Get the Classnames (key) for registered_courses
                    const courses = [];
                    for (const key in response.data[0]) {
                        if (key !== "id" && key !== "student_username" && response.data[0][key]) {
                            courses.push(key);
                            //console.log(response_two.data[0][key]);
                        }
                    }
                    setRegisteredCourses(courses);
                    console.log("registered_courses: ",registered_courses);
                    
                    const union_list = [];
                    for (const courseShortname of courses) {
                        for (const course of all_courses) {
                            if (courseShortname === course.shortname) {
                                console.log(course);
                                union_list.push(course)
                            }
                        }
                    }
                    setUnion(union_list)
                    console.log("union:",union)



                    // Store data for all three states in local storage
                    localStorage.setItem("courseData", JSON.stringify(response.data));
                    localStorage.setItem("allCourses", JSON.stringify(response_two.data));
                    localStorage.setItem("registeredCourses", JSON.stringify(courses));
                    localStorage.setItem("union", JSON.stringify(union_list));

                    
                } catch (error) {
                    console.error("Error fetching data (response_two):", error);
                }
            } catch (error) {
                console.error("Error fetching data (response):", error);
            }
        };

        // Attempt to retrieve data from local storage when the component mounts
        const storedCourseData = localStorage.getItem("courseData");
        if (storedCourseData) {
            setData(JSON.parse(storedCourseData));
        }

        const storedAllCourses = localStorage.getItem("allCourses");
        if (storedAllCourses) {
            setCourseData(JSON.parse(storedAllCourses));
        }

        const storedRegisteredCourses = localStorage.getItem("registeredCourses");
        if (storedRegisteredCourses) {
            setRegisteredCourses(JSON.parse(storedRegisteredCourses));
        }
        const storedUnion = localStorage.getItem("union");
        if (storedUnion) {
            setUnion(JSON.parse(storedUnion));
        }

        // Call the asynchronous function to fetch data
        fetchData();
    }, [user]); // Empty dependency array to run once on mount





    return (

        <div>
            <CourseSchedule courses={union} /> {/* Render the CourseSchedule component */}
        </div>
    );
}

export default Schedule;
