import React from 'react';
import { Flex } from 'antd';
import Timetable from '../components/TimeTable';
import CourseCountdown from '../components/CourseCountdown';

const CourseInformation = () => {
    return (
        <Flex gap="middle" align="center" justify="center" >
            <Flex gap="middle" align="center" justify="center" >
                <Timetable />
                <CourseCountdown />
            </Flex>
        </Flex>
    );
};

export default CourseInformation;