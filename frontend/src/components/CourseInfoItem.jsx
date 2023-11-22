import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Flex, Result, Space, Button, notification } from 'antd';
import CountdownClock from 'react-countdown-clock';
import {
    MailOutlined,
    SmileOutlined,
    VideoCameraOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import classImage from '../assets/class.svg';
import courseImage from '../assets/course.svg';
import timeImage from '../assets/time.svg';

import { UserContext } from '../App';

const { Meta } = Card;

const CourseInfoItem = ({ courseTitle, courseUid, timeLeft, zoomLink, resourceLink }) => {
    const [color, setColor] = useState('#1E90FF');
    const [countdownComplete, setCountdownComplete] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const userContext = useContext(UserContext);
    const openNotification = () => {
        api.open({
            message: 'Your class is starting soon!',
            description: 'Please join the class to ensure you do not miss any important information.',
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        })
    }

    useEffect(() => {
        if (timeLeft <= 300) {
            setColor('#A7171A');
        } else {
            setColor('#1E90FF');
        }
    }, [timeLeft]);

    const OnSendEmail = async () => {
        console.log("send email")
        const response = await axios.post(`${import.meta.env.VITE_API_URL}sendEmail`, {email: userContext.getUserEmail(), courseUid: courseUid});
        if (response.status == 200)
            alert("email sent!")
        else
            console.log("send email failed")
    }

    return (
        <Flex gap="middle" align="center" justify="center" style={{width: '100%'}} >
            {contextHolder}
            <Card hoverable cover={<img src={courseImage} height={500} />} style={{ height: 650, width: '60%' }}>
                <Meta title={courseTitle} />
                <Flex justify='flex-end' align='flex-end' >
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            href={zoomLink}
                            icon={<VideoCameraOutlined />}
                            onClick={() => { }}
                        >
                            Start Class
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            href={resourceLink}
                            icon={<ReadOutlined />}
                            onClick={() => { }}
                        >
                            Resources
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            icon={<MailOutlined />}
                            onClick={OnSendEmail}
                        >
                            Send Email
                        </Button>
                    </Space>
                </Flex>
            </Card>
            <Card hoverable cover={<img src={!countdownComplete ? timeImage : classImage} height={300} />} style={{ height: 650, width: '30%' }}>
                <Meta title={!countdownComplete ? `Time left before ${courseTitle} lesson: ` : ''} />
                {countdownComplete ? (
                    <Result
                        title="Join your class now !!!"
                        extra={
                            <Button type="primary" key="console" size="large" icon={<VideoCameraOutlined />} >
                                Zoom
                            </Button>
                        }
                    />
                ) : (
                    <Flex align="center" justify="center" style={{ marginTop: 50 }}>
                        <CountdownClock seconds={timeLeft} color={color} alpha={0.9} size={200}
                            onComplete={() => {
                                setCountdownComplete(true);
                                openNotification();
                              }}
                            />
                    </Flex>
                )}
            </Card>
        </Flex>
    );
}

export default CourseInfoItem;