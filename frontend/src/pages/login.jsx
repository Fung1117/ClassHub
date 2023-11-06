import React, { useState } from 'react';
import { Form, Input, Button, Typography, Image, Flex } from 'antd';
import { TbFaceId } from 'react-icons/tb'
import loginImage from '../assets/login.svg';
import faceLoginImage from '../assets/faceLogin.svg'
const { Title } = Typography;

const Login = () => {
    const [loginMethod, setLoginMethod] = useState('password'); // Default to password login

    const toggleLoginMethod = () => {
        setLoginMethod((prevMethod) => (prevMethod === 'password' ? 'faceId' : 'password'));
    };

    const onFinish = (values) => {
        if (loginMethod == 'password') {

        } else {
            
        }
    };

    return (
        <Flex justify="center" align="center" vertical style={{width: '100%'}}>
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
            <Form name="login" onFinish={onFinish} style={{ width: 500}}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    style={{ display: loginMethod === 'password' ? 'block' : 'none' }}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="faceId"
                    style={{ display: loginMethod === 'faceId' ? 'block' : 'none' }}
                >
                    {/* Implement face ID authentication component here */}
                    {/* Example: <FaceIdComponent /> */}
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
        </Flex>
    );
};

export default Login;