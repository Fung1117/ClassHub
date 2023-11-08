import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, theme, Image, Space } from 'antd';
import CourseInformation from './pages/CourseInformation';
import Statistic from './pages/Statistics';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Enroll from './pages/Enroll'
import {
  HomeOutlined,
  CalendarOutlined,
  LineChartOutlined,
  AppstoreAddOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { GiEvilBook } from 'react-icons/gi';
import HeaderLogo from './assets/Header.svg';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'DashBoard', link: '/' },
    { key: '2', icon: <CalendarOutlined />, label: 'TimeTable', link: '/Course' },
    { key: '3', icon: <AppstoreAddOutlined />, label: 'Enroll', link: '/Enroll' },
    { key: '4', icon: <LineChartOutlined />, label: 'Statistic', link: '/Statistic' },
  ];

  return (
    <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Link to="/" onClick={() => setSelectedKeys(['1'])}>
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <GiEvilBook style={{ color: 'white', fontSize: 36 }} />
            </div>
          </Link>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={selectedKeys} >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link} onClick={() => setSelectedKeys([item.key])}>{item.label}</Link>
              </Menu.Item>
            ))}
            <Menu.Item key="5" icon={<LogoutOutlined />} style={{ position: 'absolute', bottom: 10, left: 0}}>
              <Link to="/logout" onClick={() => setSelectedKeys(['5'])}>Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, height: '100px' }}>
          <Space>
            <Image src={HeaderLogo} preview={false} alt="Logo" style={{ height: '100px', marginLeft: '16px', verticalAlign: 'top' }} />
            <Link to="/login" onClick={() => setSelectedKeys(['0'])}>
              <Button type="primary" size="large" icon={<LoginOutlined />} style={{ position: 'absolute', top: 30, right: 30 }}>
                Login
              </Button>
            </Link>
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
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Course" element={<CourseInformation />} />
            <Route path="/Statistic" element={<Statistic />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/Enroll" element={<Enroll />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          intelligent Course Management System ©2023 Created by Group 28
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
