import React, { useEffect, useState } from 'react';
import { Card, Flex, Row, Col, Progress, Space, Button } from 'antd';
import {
    VideoCameraOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import courseImage from '../assets/course.svg'

const { Meta } = Card;

export const CourseInfoItem = ({ courseName: courseTitle, timeLeft, zoomLink, resourceLink }) => {
    const [timeLeftState, setTimeLeft] = useState(timeLeft);
    const [courseTitleState, setCourseName] = useState(courseTitle);

    useEffect(() => {
        setTimeLeft(timeLeft);
        setCourseName(courseTitle);
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeftState <= 0) {
                clearInterval(timer);
                return;
            }
            setTimeLeft(timeLeftState - 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    });

    return (
        <>
            <Card hoverable cover={<img src={courseImage} height={500} />} style={{ width: 900 }}>
                <Meta title={courseTitle} description="www.instagram.com" />
                <Flex justify={'flex-end'} align={'center'}>
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            icon={<VideoCameraOutlined />}
                            onClick={() => { }}
                        >
                            Start Class
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ReadOutlined />}
                            onClick={() => { }}
                        >
                            Resources
                        </Button>
                    </Space>
                </Flex>
            </Card>

        </>
    );
}

export default CourseInfoItem;