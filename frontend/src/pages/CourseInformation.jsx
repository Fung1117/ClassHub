import React from 'react';
import { Flex } from 'antd';
import Timetable from '../components/TimeTable';
import TeacherMessageBoard from '../components/TeacherMessageBoard';

const CourseInformation = () => {
    return (
        <Flex gap="middle" align="center" justify="center" style={{ width: '100%' }}>
            <Flex gap="middle" align="center" justify="center" style={{ width: '100%' }}>
                <Timetable />
                <TeacherMessageBoard />
            </Flex>
        </Flex>
    );
};

export default CourseInformation;