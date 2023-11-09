import React, { useState } from 'react';
import { Avatar, Button, Card, Modal, Table } from 'antd';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import { HistoryOutlined } from '@ant-design/icons';
const { Meta } = Card;

const UserActivity = ({data}) => {
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
          <ScrollElement style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table dataSource={history} columns={columns} pagination={false} />
          </ScrollElement>
        </Modal>
      </div>
    </Card>
  );
};

export default UserActivity;
