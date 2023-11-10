import React from 'react';
import { Flex } from 'antd';

import CourseInfoItem from '../components/CourseInfoItem';

const OneHrCourse = () => {
    return (
        <Flex gap="small" vertical justify="flex-start" align="center" flex="1" style={{ width: "100%"}}>
            <CourseInfoItem
                courseName="Math"
                timeLeft={1500}
                zoomLink="https://zoom.us/j/1234567890"
                resourceLink="https://www.google.com"
            />
            
        </Flex>
    );
};

export default OneHrCourse;