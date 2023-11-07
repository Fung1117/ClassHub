import React from 'react';
import { Flex } from 'antd';
import Timetable from '../components/TimeTable';
import CourseCountdown from '../components/CourseCountdown';
import TeacherMessageBoard from '../components/TeacherMessageBoard';

const CourseInformation = () => {
    return (
        <Flex gap="middle" align="center" justify="center" >
            <Flex gap="middle" align="center" justify="center" >
                {/* <Timetable /> */}
                <CourseCountdown />
                {/* <TeacherMessageBoard /> */}
            </Flex>
        </Flex>
    );
};

export default CourseInformation;