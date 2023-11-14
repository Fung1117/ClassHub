import React from 'react';
import { Flex } from 'antd';
import AddCourse from '../components/AddCourse';
import DropCourse from '../components/DropCourse';

const Enroll = () => {

    return (
        <Flex gap="middle" align="center" justify="center" style={{ width: '100%' }} >
            <AddCourse />
            <DropCourse />
        </Flex>
    );
};

export default Enroll;
