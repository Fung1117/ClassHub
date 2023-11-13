import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, theme, Image, Space } from 'antd';
import Home from './pages/Home';
import Enroll from './pages/Enroll';
import CourseInformation from './pages/CourseInformation';
import Statistic from './pages/Statistics';
import Login from './pages/Login';
import Logout from './pages/Logout';
import OneHrCourse from './pages/OneHrCourse';
import {
  HomeOutlined,
  CalendarOutlined,
  LineChartOutlined,
  LoginOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';

import { GiEvilBook } from 'react-icons/gi';
import HeaderLogo from './assets/Header.svg';

export const UserContext = React.createContext(null);
const { Header, Sider, Content, Footer } = Layout;

const App = () => {

  // ////////////////////////////////////////////////////////////////////////
  // // uncomment this when u don't want to care about login logout stuff ///
  // useEffect(() => {
  //   localStorage.setItem('userUid', '123456789');
  // }, []);
  // ////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////
  
  const location = useLocation();
  const navigate = useNavigate();
  const getUserUid = () => localStorage.getItem('userUid');
  const setUserUid = (token) => localStorage.setItem('userUid', token);
  const removeUserUid = () => localStorage.removeItem('userUid')
  useEffect(() => {
    if (location.pathname != '/Login' && !getUserUid()) {
        navigate('/Login')
        setSelectedKeys(['1'])
    }
    if (location.pathname == '/Login' && !!getUserUid()) {
      navigate('/')
    }
  })

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['0']);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const storedKey = localStorage.getItem('selectedKey');
    if (storedKey && menuItems.some(item => item.key === storedKey)) {
      setSelectedKeys([storedKey]);
    } else {
      // Handle the case where the stored key is not valid or not set
      // For example, you could set a default selected key here.
    }
  }, []);

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'DashBoard', link: '/' },
    { key: '2', icon: <CalendarOutlined />, label: 'TimeTable', link: '/timetable' },
    { key: '3', icon: <ClockCircleOutlined />, label: 'Upcoming Course', link: '/upcoming-course' },
    { key: '4', icon: <ScheduleOutlined />, label: 'Enroll', link: '/enroll' },
    { key: '5', icon: <LineChartOutlined />, label: 'Statistic', link: '/statistic' },
  ];

  const handleMenuItemClick = (key, link) => {
    if (key === '0') {
      if (getUserUid() === null) {
        navigate('/Login');
        return;
      }
      return;
    }
    if (getUserUid() === null) {
      alert('Please login first!');
      return;
    }

    setSelectedKeys(key);
    localStorage.setItem('selectedKey', key);
    console.log(link);
    navigate(link);
  };

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Link to="/" onClick={() => handleMenuItemClick(['1'])}>
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <GiEvilBook style={{ color: 'white', fontSize: 36 }} />
          </div>
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={selectedKeys} >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Button onClick={() => handleMenuItemClick(item.key, item.link)} style={{background: "none", color: "inherit", border: "none", padding: "0", font: "inherit", cursor: "pointer", outline: "inherit"}}>{item.label}</Button>
            </Menu.Item>
          ))}
          <Menu.Item key="6" icon={<LogoutOutlined />} style={{ position: 'absolute', bottom: 10, left: 0 }}>
            <Link to="/logout" onClick={() => handleMenuItemClick(['6'])}>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, height: '100px' }}>
          <Space>
            <Image src={HeaderLogo} preview={false} alt="Logo" style={{ height: '100px', marginLeft: '16px', verticalAlign: 'top' }} />
              <Button onClick={() => handleMenuItemClick(['0'])} style={{background: "none", color: "inherit", border: "none", padding: "0", font: "inherit", cursor: "pointer", outline: "inherit"}}/>
              <Button type="primary" size="large" icon={<LoginOutlined />} style={{ position: 'absolute', top: 35, right: 30 }}>
                Login
              </Button>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            marginBottom: '0px',
            padding: 24,
            minHeight: 280,
            height: 700,
            background: colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UserContext.Provider value={{getUserUid}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/Login" element={<Login setUserUid={setUserUid} />} />
              <Route path="/timetable" element={<CourseInformation />} />
              <Route path="/upcoming-course" element={<OneHrCourse />} />
              <Route path="/statistic" element={<Statistic />} />
              <Route path="/Logout" element={<Logout removeUserUid={removeUserUid} />} />
            </Routes>
          </UserContext.Provider>
        </Content>
        <Footer style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          intelligent Course Management System ©2023 Created by Group 28
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
