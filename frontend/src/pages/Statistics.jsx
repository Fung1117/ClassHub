import React from 'react';
import { Flex } from 'antd';
import UserActivity from '../components/UserActivity'
import UserStayTimeChart from '../components/UserStayTimeChart'

const Statstics = () => {
    return (
        <Flex gap="middle" align="center" justify="center" style={{ height: '100vh' }} >
            <Flex gap="middle" align="center" justify="center" >
                <UserStayTimeChart />
                <UserActivity />
            </Flex>
        </Flex>

    );
};

export default Statstics;