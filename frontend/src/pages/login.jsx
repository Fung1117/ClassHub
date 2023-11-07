import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Image, Flex, Modal, Spin, Result } from 'antd';
import Webcam from "react-webcam";
import { TbFaceId } from 'react-icons/tb'
import { UserContext } from '../App';
import loginImage from '../assets/password-login.svg';
import faceLoginImage from '../assets/face-login.svg'
const { Title } = Typography;

const Login = () => {
    const [loginMethod, setLoginMethod] = useState('password'); // Default to password login
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const webcamRef = useRef(null);
    const userTokenController = useContext(UserContext);
    const navigate = useNavigate();

    const toggleLoginMethod = () => {
        setLoginMethod((prevMethod) => (prevMethod === 'password' ? 'faceId' : 'password'));
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log('Captured image:', imageSrc);
        setLoading(true);
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 5000)

        // fetch('YOUR_BACKEND_API_ENDPOINT', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ image: imageSrc }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Backend response handling
        //     console.log('Backend Response:', data);
        //     setLoading(false); // Stop loading spinner

        //     // Update captureSuccess state based on the backend response
        //     if (data.success) {
        //         setCaptureSuccess(true);
        //     } else {
        //         setCaptureSuccess(false);
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     setLoading(false); // Stop loading spinner
        //     // Handle error, show error message, etc.
        // });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = (values) => {
        console.log(values)
        if (loginMethod == 'password') {
            userTokenController.setUserToken("bruh");
            navigate('/TimeTable');
            setLoading(true);
        }
        showModal();
    };

    return (
        <Flex justify="center" align="center" vertical style={{ width: '100%' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
                Login
            </Title>
            <Image
                width={600}
                height={400}
                src={loginMethod === 'password' ? loginImage : faceLoginImage}
                style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}
                preview={false}
            />
            <Form name="login" onFinish={onFinish} style={{ width: 500 }}>
                <Form.Item
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: loginMethod === 'password', message: 'Please input your password!' }]}
                    style={{ display: loginMethod === 'password' ? 'block' : 'none' }}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    style={{ display: loginMethod === 'faceId' ? 'block' : 'none' }}
                >
                </Form.Item>
                <Form.Item style={{ textAlign: 'center', width: '600' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Button type="primary" htmlType="submit" style={{ width: '80%' }}>
                            Log in
                        </Button>
                        <Button
                            type={loginMethod === 'password' ? 'default' : 'primary'} icon={<TbFaceId style={{ fontSize: '24px' }} />} onClick={toggleLoginMethod} style={{ width: '18%' }}>
                        </Button>
                    </div>
                </Form.Item>
            </Form>

            <Modal
                title="Basic Modal"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ height: 500 }}
            >
                <Flex direction="column" justify="center" align="center">
                    {success ? (
                        <Result
                            status={'success'}
                            title={'Face Captured Successfully!'}
                        />
                    ) : error ? (
                        <Result
                            status={'warning'}
                            title={'Wrong Face!'}
                        />
                    ): loading ? (
                    <Spin size="large" />
                    ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ width: 450, height: 300, facingMode: 'user' }}
                    />
                    )}
                </Flex>
            </Modal>
        </Flex>
    );
};

export default Login;