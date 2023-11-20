import React from 'react';
import { Flex, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Wellcome from '../assets/wellcomeImage.svg'

const { Meta } = Card;

const Home = () => {
    return (
        <Flex justify="center" align="center" vertical style={{ width: '100%' }}>
            <Flex gap="middle" align="center" justify="center" style={{ width: '100%', }}>
                <Card hoverable cover={<img src={Wellcome} height={550} />} style={{ height: 650, width: '60%' }} >
                    <Meta title={`Welcome to ICMS! name`} />
                </Card>
                <Flex justify="center" align="center" vertical gap={20} style={{ height: 650, width: '30%' }}>
                    <Card hoverable cover={<img src={Wellcome} height={200} />} style={{ height: 320, width: '100%' }} actions={[<RightOutlined key="setting" />]}>
                        <Meta
                            title="If you have a class soon, find all the details—classroom, teacher's message, Zoom link, and materials—all in one place."
                        />
                    </Card>
                    <Card hoverable cover={<img src={Wellcome} height={200} />} style={{ height: 320, width: '100%' }} actions={[<RightOutlined key="setting" />]}>
                        <Meta
                            title="No class now? Check your personal timetable anytime."
                        />
                    </Card>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Home;
