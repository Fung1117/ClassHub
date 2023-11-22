import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Typography, Spin, Result, Flex, Image, Modal, Progress } from 'antd';
import axios from 'axios';
import Webcam from 'react-webcam';
import registerImage from '../assets/registerImage.png';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    uid: '',
    name: '',
    email: '',
    password: '',
    capturedImages: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const webcamRef = useRef(null);

  useEffect(() => {
    if (formData.capturedImages.length === 400) {
      handleRegistration(); // Assuming you want to trigger registration when 400 images are captured
    }
  }, [formData.capturedImages]);

  const captureAndAddImage = async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    await setFormData((prevData) => ({
      ...prevData,
      capturedImages: [...prevData.capturedImages, imageSrc],
    }));
    setProgress(prevProgress => prevProgress + 1);
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      // Check if the password and confirm password match
      if (values.password !== values.confirmPassword) {
        setLoading(false);
        setError(true);
        showModal();
        return;
      }

      await captureImagesSequentially();

      setFormData((prevData) => ({
        ...prevData,
        uid: values.uid,
        name: values.name,
        email: values.email,
        password: values.password,
      }));

      // Registration will now be triggered in the useEffect when 400 images are captured
    } catch (error) {
      setLoading(false);
      setError(true);
      showModal();
    }
  };

  const handleRegistration = async () => {
    try {
      console.log(formData);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}Register`, formData);
      console.log('Registration response:', response.data);

      setLoading(false);

      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setLoading(false);
      setError(true);
    } finally {
      showModal();
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
    // You can add additional logic here if needed
  };

  const handleCancel = () => {
    setModalVisible(false);
    // You can add additional logic here if needed
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const captureImagesSequentially = async () => {
    for (let i = 0; i < 400; i++) {
      await delay(100);
      captureAndAddImage();
    }
  };

  return (
    <Flex justify="space-between" style={{ padding: '20px', width: '50%' }}>
      <Image
        style={{ width: 400, height: 600 }}
        src={registerImage}
        alt="Register Image"
      />
      <Flex
        justify="center"
        align="center"
        direction="column"
        style={{ width: '300px', textAlign: 'center', height: 600 }}
      >
        <Form name="register" onFinish={onFinish}>
          <Title level={2} style={{ marginBottom: '30px' }}>
            Register
          </Title>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="uid"
            rules={[{ required: true, message: 'Please input your UID!' }]}
          >
            <Input placeholder="UID" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Progress
              percent={(progress / 400) * 100}
              status="active"
              format={() => `${progress}/400`}
            />
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ width: 300, height: 200, facingMode: 'user' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      <Modal
        title="Registration Status"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {success && (
          <Result
            status="success"
            title="Registration successful!"
          />
        )}
        {error && (
          <Result
            status="error"
            title="Registration failed. Please try again."
          />
        )}
        {loading && <Spin />}
      </Modal>
    </Flex>
  );
};

export default Register;
