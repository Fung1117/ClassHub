import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Button, theme, Image } from 'antd';
import CourseInformation from './pages/CourseInformation';
import Statistic from './pages/Statistics';
import Login from './pages/Login'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CalendarOutlined,
  LineChartOutlined
} from '@ant-design/icons';

import HeaderLogo from './assets/Header.svg';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'Nav 1', link: '/nav1' },
    { key: '2', icon: <CalendarOutlined />, label: 'TimeTable', link: '/Course' },
    { key: '3', icon: <LineChartOutlined />, label: 'Statistic', link: '/statistic' },
  ];

  return ( 
    <Layout style={{ minHeight: '90vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={selectedKeys}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link} onClick={() => setSelectedKeys([item.key])}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, height: '100px' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: '16px',
              top: '18px',
              width: 100,
              height: 64,
            }}
          />
          <Image src={HeaderLogo} preview={false} alt="Logo" style={{ height: '100px', marginLeft: '16px', verticalAlign: 'top' }} />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            marginBottom: '0px',
            padding: 24,
            minHeight: 280,
            height: 700,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Course" element={<CourseInformation />} />
            <Route path="/Statistic" element={<Statistic />} />
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
