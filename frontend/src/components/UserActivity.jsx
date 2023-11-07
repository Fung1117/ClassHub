import React, { useState } from 'react';
import { Avatar, Button, Card, Modal, Table } from 'antd';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import { HistoryOutlined } from '@ant-design/icons';
const { Meta } = Card;

const UserActivity = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Static data for testing
  const activityHistory = [
    { date: '10/01', Duration: '1 hour 20 mins' },
    { date: '10/02', Duration: '1 hour 45 mins' },
    { date: '10/03', Duration: '2 hours 10 mins' },
    { date: '10/04', Duration: '1 hour 30 mins' },
    { date: '10/05', Duration: '2 hours' },
    { date: '10/06', Duration: '1 hour 15 mins' },
    { date: '10/07', Duration: '2 hours 30 mins' },
    { date: '10/08', Duration: '1 hour 40 mins' },
    { date: '10/09', Duration: '1 hour 55 mins' },
    { date: '10/10', Duration: '1 hour 10 mins' },
    { date: '10/11', Duration: '50 mins' },
    { date: '10/12', Duration: '2 hours 30 mins' },
    { date: '10/13', Duration: '1 hour' },
    { date: '10/14', Duration: '45 mins' },
    { date: '10/15', Duration: '2 hours' },
    { date: '10/16', Duration: '1 hour 20 mins' },
    { date: '10/17', Duration: '1 hour 45 mins' },
    { date: '10/18', Duration: '2 hours 10 mins' },
    { date: '10/19', Duration: '1 hour 30 mins' },
    { date: '10/20', Duration: '2 hours' },
    { date: '10/21', Duration: '1 hour 15 mins' },
    { date: '10/22', Duration: '2 hours 30 mins' },
    { date: '10/23', Duration: '1 hour 40 mins' },
    { date: '10/24', Duration: '1 hour 55 mins' },
    { date: '10/25', Duration: '1 hour 10 mins' },
    { date: '10/26', Duration: '50 mins' },
    { date: '10/27', Duration: '2 hours 30 mins' },
    { date: '10/28', Duration: '1 hour' },
    { date: '10/29', Duration: '45 mins' },
    { date: '10/30', Duration: '2 hours' },
    { date: '10/31', Duration: '1 hour 20 mins' },
    // Add more activity history data as needed
  ];


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

  const totalTimeInMinutes = 342; // 5 hours 42 minutes
  const hours = Math.floor(totalTimeInMinutes / 60);
  const minutes = totalTimeInMinutes % 60;

  const handleButtonClick = () => {
    // Handle button click logic here
    console.log('Button clicked!');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Card title="User Activity" style={{ height: 300 }}>
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title={`Last Login: 2023-11-01 15:30:00`}
        description={`Total Time in System: ${hours > 0 ? `${hours} hours ` : ''}${minutes > 0 ? `${minutes} minutes` : ''}`}
      />
      <div style={{ textAlign: 'center', margin: '20px 0', width: '100%' }}>
        <Button type="primary" onClick={handleButtonClick} icon={<HistoryOutlined />} style={{ width: '100%', marginTop: 100 }}>
          Show all record
        </Button>
        <Modal
          title="User Activity History"
          open={modalVisible}
          onCancel={closeModal}
          centered
          footer={null}
        >
          <ScrollElement style={{maxHeight: '400px',overflowY: 'auto'}}>
            <Table dataSource={activityHistory} columns={columns} pagination={false} />
          </ScrollElement>
        </Modal>
      </div>
    </Card>
  );
};

export default UserActivity;
