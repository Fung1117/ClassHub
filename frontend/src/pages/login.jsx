import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, Image, Flex, Modal, Spin, Result } from 'antd';
import Webcam from "react-webcam";
import { TbFaceId } from 'react-icons/tb'
import loginImage from '../assets/password-login.svg';
import faceLoginImage from '../assets/face-login.svg'

import { UserContext } from '../App';
import { Loading } from 'mdi-material-ui';

const { Title } = Typography;

const Login = ({setUserUid, setUserEmail}) => {
    const [loginMethod, setLoginMethod] = useState('password'); // Default to password login
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [DBmessage, setDBmessage ] = useState('Fail to connect database !!');

    const webcamRef = useRef(null);
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    const toggleLoginMethod = () => {
        setLoginMethod((prevMethod) => (prevMethod === 'password' ? 'faceId' : 'password'));
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        if (success) {
            setOpen(false);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}upcomingCourse`, {params:{uid: userContext.getUserUid()}});
            const data = response.data;
            console.log(data)
            if (data.length >= 0) {
                navigate('/upcoming-course')
                return
            }
            navigate('/');
        } else if (error) {
            setOpen(false);
            setLoading(false);
            setError(false);
        }
        if (loading) {
            setLoading(false);
        }
        const imageSrc = webcamRef.current.getScreenshot();
        faceLogin(imageSrc)
    };

    const handleCancel = () => {
        setOpen(false);
        setLoading(false);
    };

    const onFinish = (values) => {
        setEmail(values.email);
        if (loginMethod == 'password') {
            setLoading(true);
            // email state isn't updated immediately, have to pass email in as param
            passwordLogin(values.email, values.password);
        }
        showModal();
    };

    const passwordLogin = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}Login`, { isFace: false, email: email, password: password });
            const data = response.data;
            console.log('Backend Response:', data);
            setDBmessage(data.message);
            setLoading(false);
            if (data.success) {
                setSuccess(true);
                setUserEmail(email);
                setUserUid(data.uid);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}upcomingCourse`, {params:{uid: userContext.getUserUid()}});
                setTimeout(() => {
                    const data = response.data;
                    if (data.length > 0) {
                        navigate('/upcoming-course')
                        return
                    }
                    navigate('/')
                }, 2000);                
            } else {
                setError(true);
            }
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    const faceLogin = async (imageSrc) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}Login`, { isFace: true, email: email, image: imageSrc });
            const data = response.data;
            console.log('Backend Response:', data);
            setLoading(false);
            setDBmessage(data.message);
            if (data.success) {
                setSuccess(true);
                setUserEmail(email);
                setUserUid(data.uid);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}upcomingCourse`, {params:{uid: userContext.getUserUid()}});
                setTimeout(() => {
                    const data = response.data;
                    if (data.length > 0) {
                        navigate('/upcoming-course')
                        return
                    }
                    navigate('/')
                }, 2000);
            } else {
                setError(true);
            }
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

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
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="Email" />
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
                title="Basic Model"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ height: 500 }}
            >
                <Flex direction="column" justify="center" align="center">
                    {success ? (
                        <Result
                            status={'success'}
                            title={DBmessage}
                        />
                    ) : error ? (
                        <Result
                            status={'warning'}
                            title={DBmessage}
                        />
                    ) : loading ? (
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