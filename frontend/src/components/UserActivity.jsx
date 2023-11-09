import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Modal, Table } from 'antd';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import { HistoryOutlined } from '@ant-design/icons';
import axios from 'axios';
import activity from '../assets/activity.svg'

const { Meta } = Card;

const UserActivity = ({ data }) => {
  const [lastLogin, setLastLogin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const history = data.date.map((date, index) => ({ date, Duration: data.time[index] }))

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Duration',
      dataIndex: 'Duration',
      key: 'Duration',
    },
  ];

  useEffect(() => {
    const fetchLastLogin = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}last-login`);
        setLastLogin(response.data.lastLogin);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLastLogin(); // Call the async function inside useEffect
  }, []);

  const totalTime = data.time.reduce((total, number) => total + number, 0)
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Card hoverable cover={<img src={activity} />} style={{ height: 500, width: 350 }}>
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title={`Name: Fung`}
        description={`UID: 3035928287`}
      />
      <Meta
        title={`Last Login: ${lastLogin}`}
        description={`Total Time in System: ${hours > 0 ? `${hours} hours ` : ''}${minutes > 0 ? `${minutes} minutes` : ''}`}
        style={{marginTop: 30}}
      />
      <div style={{ textAlign: 'center', margin: '0', width: '100%' }}>
        <Button type="primary" onClick={handleButtonClick} icon={<HistoryOutlined />} style={{ width: '100%', marginTop: 30 }}>
          Show all record
        </Button>
        <Modal
          title="User Activity History"
          open={modalVisible}
          onCancel={closeModal}
          centered
          footer={null}
        >
          <ScrollElement style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table dataSource={history} columns={columns} pagination={false} />
          </ScrollElement>
        </Modal>
      </div>
    </Card>
  );
};

export default UserActivity;
