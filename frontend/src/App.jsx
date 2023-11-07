import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, theme, Image, Space } from 'antd';
import TimeTable from './components/TimeTable';
import Statistic from './pages/Statistics';
import Login from './pages/Login'
import Enroll from './pages/Enroll'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CalendarOutlined,
  LineChartOutlined,
  AppstoreAddOutlined
} from '@ant-design/icons';

import HeaderLogo from './assets/Header.svg';
import useToken from 'antd/es/theme/useToken';

export const UserContext = React.createContext(false);

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const getUserToken = () => { return localStorage.getItem("userToken") }
  const setUserToken = (token) => { localStorage.setItem("userToken", token) }
  const logout = () => { localStorage.removeItem("userToken") }
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
    { key: '2', icon: <CalendarOutlined />, label: 'TimeTable', link: '/TimeTable' },
    { key: '3', icon: <LineChartOutlined />, label: 'Statistic', link: '/statistic' },
    { key: '4', icon: <AppstoreAddOutlined/>, label: 'Enroll', link: '/Enroll' },
  ];


  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname != '/' && !localStorage.getItem("userToken")) {
        navigate('/')
        setSelectedKeys(['1'])
        alert("Please login first")
    }
    if (location.pathname == '/' && !!localStorage.getItem("userToken")) {
      navigate('/TimeTable')
    }
  })

  
  return ( 
    <Layout style={{ minHeight: '90vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* {!!getUserToken() && */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={selectedKeys}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link} onClick={() => setSelectedKeys([item.key])}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        {/* } */}
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
          <Space>
            <Image src={HeaderLogo} preview={false} alt="Logo" style={{ height: '100px', marginLeft: '16px', verticalAlign: 'top' }} />
            <Button
              style={{
                marginLeft: '100px',
              }}
              >
              <Link to="/" onClick={() => {logout(); setSelectedKeys(['1']);}}>Logout</Link>
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
          }}
        >
          <UserContext.Provider value={{ getUserToken: getUserToken, setUserToken: setUserToken }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/TimeTable" element={<TimeTable />} />
              <Route path="/Statistic" element={<Statistic />} />
              <Route path="/Enroll" element={<Enroll />} />
            </Routes>
          </UserContext.Provider>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          intelligent Course Management System ©2023 Created by Group 28
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
