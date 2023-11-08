import React, { useEffect, useState } from 'react';
import { Flex, Row, Col, Progress, Space, Button } from 'antd';
import {
    VideoCameraOutlined,
    ReadOutlined,
} from '@ant-design/icons';

export const CourseInfoItem = ({courseName: courseTitle, timeLeft, zoomLink, resourceLink}) => {
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
        <Flex vertical gap="small" align="center" justify="start" style={{ width: "100%"}}>
            <Col>
                <Row span={6} justify="center" style={{ fontSize: "24px", fontWeight: "700"}}>
                    {courseTitleState}
                </Row>
                <Row span={12}>
                    <Space size="large">
                        <Button href={zoomLink} icon={<VideoCameraOutlined/>} style={{ fontSize: "18px"}}>To Zoom</Button>
                        <Button href={resourceLink} icon={<ReadOutlined />} style={{ fontSize: "18px"}}>To course resource</Button>
                    </Space>
                </Row>
                <Row justify="center" style={{ fontSize: "18px"}}>
                    time left before lesson: {parseInt(timeLeftState/60) < 10 ? '0' : null}{parseInt(timeLeftState/60)}:{parseInt(timeLeftState%60) < 10 ? '0' : null}{parseInt(timeLeftState%60)}
                </Row>
            </Col>
            <Progress percent={(3600-timeLeftState)/3600 * 100} showInfo={false}/>
        </Flex>
    );
}

export default CourseInfoItem;