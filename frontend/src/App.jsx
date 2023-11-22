import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { notification, Layout, Menu, Button, theme, Image, Space } from 'antd';
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


  // useEffect(() => {
  //   localStorage.setItem('userUid', '123456789');
  // }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const getUserName = () => localStorage.getItem('userName');
  const setUserName = (token) => localStorage.setItem('userName', token);
  const removeUserName = () => localStorage.removeItem('userName')
  const getUserEmail = () => localStorage.getItem('userEmail');
  const setUserEmail = (token) => localStorage.setItem('userEmail', token);
  const removeUserEmail = () => localStorage.removeItem('userEmail')
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
    console.log(location.pathname);
    switch (location.pathname) {
      case '/':
        setSelectedKeys(['1'])
        break;
      case '/TimeTable':
        setSelectedKeys(['2'])
        break;
      case '/upcoming-course':
        setSelectedKeys(['3'])
        break;
      case '/Enroll':
        setSelectedKeys(['4'])
        break;
      case '/Statistic':
        setSelectedKeys(['5'])
        break;
      default:
        break;
    }
  }, [location])

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

  const isLoginPage = location.pathname === '/Login';

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'DashBoard', link: '/' },
    { key: '2', icon: <CalendarOutlined />, label: 'TimeTable', link: '/TimeTable' },
    { key: '3', icon: <ClockCircleOutlined />, label: 'Upcoming Course', link: '/upcoming-course' },
    { key: '4', icon: <ScheduleOutlined />, label: 'Enroll', link: '/Enroll' },
    { key: '5', icon: <LineChartOutlined />, label: 'Statistic', link: '/Statistic' },
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
      showLoginAlert();
      return;
    }

    setSelectedKeys(key);
    localStorage.setItem('selectedKey', key);
    navigate(link);
  };

  const showLoginAlert = () => {
    notification.warning({
      message: 'Please login first!',
      placement: 'topRight',
    });
  };

  return (
    <Layout>
      {!isLoginPage && (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <Link to="/" onClick={() => handleMenuItemClick(['1'])}>
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <GiEvilBook style={{ color: 'white', fontSize: 36 }} />
            </div>
          </Link>
          {!!getUserUid() &&
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={selectedKeys} >
              {menuItems.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Button onClick={() => handleMenuItemClick(item.key, item.link)} style={{ background: "none", color: "inherit", border: "none", padding: "0", font: "inherit", cursor: "pointer", outline: "inherit" }}>{item.label}</Button>
                </Menu.Item>
              ))}
              <Menu.Item key="6" icon={<LogoutOutlined />} style={{ position: 'absolute', bottom: '7%', left: 0 }}>
                <Link to="/Logout" onClick={() => handleMenuItemClick(['6'])}>Logout</Link>
              </Menu.Item>
            </Menu>}
        </Sider>
      )}

      <Layout style={{ marginLeft:  isLoginPage ? 0 : (collapsed ? 50 : 170), transition: 'margin-left 0.3s' }}>
        {!isLoginPage && (
          <Header style={{ padding: 0, background: colorBgContainer, height: '100px' }}>
            <Space>
              <Image src={HeaderLogo} preview={false} alt="Logo" style={{ height: '100px', marginLeft: '16px', verticalAlign: 'top' }} />
              <Button onClick={() => handleMenuItemClick(['0'])} style={{ background: "none", color: "inherit", border: "none", padding: "0", font: "inherit", cursor: "pointer", outline: "inherit" }} />
              {!getUserUid() &&
                <Button type="primary" size="large" icon={<LoginOutlined />} style={{ position: 'absolute', top: 35, right: 30 }}>
                  Login
                </Button>}
            </Space>
          </Header>
        )}
        <Content
          style={{
            paddingTop: 40,
            minHeight: 280,
            height: '100%',
            width: '100%',
            background: colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UserContext.Provider value={{ getUserUid, getUserEmail, getUserName }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Enroll" element={<Enroll />} />
              <Route path="/Login" element={<Login setUserUid={setUserUid} setUserEmail={setUserEmail} setUserName={setUserName}/>} />
              <Route path="/TimeTable" element={<CourseInformation />} />
              <Route path="/upcoming-course" element={<OneHrCourse />} />
              <Route path="/Statistic" element={<Statistic />} />
              <Route path="/Logout" element={<Logout removeUserUid={removeUserUid} removeUserEmail={removeUserEmail} removeUserName={removeUserName}/>} />
            </Routes>
          </UserContext.Provider>
        </Content>
        {!isLoginPage && (
          <Footer style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#001529',
            color: 'white',
            padding: '15px',
            marginLeft: '1%',
          }}>
            intelligent Course Management System ©2023 Created by Group 28
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};

export default App;
