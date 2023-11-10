import React from 'react';

import CourseInfoItem from '../components/CourseInfoItem';

const OneHrCourse = () => {
    return (
        <CourseInfoItem
            courseName="Math"
            timeLeft={10}
            zoomLink="https://zoom.us/j/1234567890"
            resourceLink="https://www.google.com"
        />
    );
};

export default OneHrCourse;