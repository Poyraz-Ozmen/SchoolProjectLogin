import React from 'react';

const CourseSchedule = ({ courses }) => {
    const hours = [
        '8:30',
        '9:30',
        '10:30',
        '11:30',
        '12:30',
        '13:30',
        '14:30',
        '15:30',
        '16:30',
        '17:30',
        '18:30',
        '19:30',
    ];

    const courseMap = {};

    hours.forEach((hour) => {
        courseMap[hour] = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
        };
    });

    courses.forEach((course) => {
        const { day, hour } = course;

        // Split the course hour range (e.g., "15:30-17:30")
        const [startHour, endHour] = hour.split('-');

        // Iterate over the hours in the range and add the course to each
        for (let i = hours.indexOf(startHour); i <= hours.indexOf(endHour); i++) {
            if (courseMap[hours[i]] && courseMap[hours[i]][day]) {
                courseMap[hours[i]][day].push(course);
            }
        }
    });

    return (
        <div className="course-schedule-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="course-schedule" style={{ background: 'white', flexGrow: 1 }}>
                <h1 style={{ color: 'black' }}>Course Schedule</h1>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map((hour) => (
                                <tr key={hour}>
                                    <td>{hour}</td>
                                    <td>
                                        {courseMap[hour].Monday.map((course) => (
                                            <div key={course.id}>{course.shortname}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {courseMap[hour].Tuesday.map((course) => (
                                            <div key={course.id}>{course.shortname}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {courseMap[hour].Wednesday.map((course) => (
                                            <div key={course.id}>{course.shortname}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {courseMap[hour].Thursday.map((course) => (
                                            <div key={course.id}>{course.shortname}</div>
                                        ))}
                                    </td>
                                    <td>
                                        {courseMap[hour].Friday.map((course) => (
                                            <div key={course.id}>{course.shortname}</div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourseSchedule;