import React from 'react';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import { Card, List } from 'antd';
import TeacherMessage from '../assets/teacher-message.svg'
import axios from 'axios';

const messages = [
  {
    id: 1,
    teacherName: 'Teacher 1',
    message: 'Hello students! Please submit your assignments by the end of this week.',
  },
  {
    id: 2,
    teacherName: 'Teacher 2',
    message: 'Reminder: There will be a quiz on Monday. Prepare well!',
  },  
  // Add more messages as needed
];

const TeacherMessageBoard = () => {
  return (
    <Card hoverable title='Teacher Message Board' cover={<img src={TeacherMessage} height={300} />} style={{width: 500, height: 650}}>
      <ScrollElement style={{ height:'250px' ,maxHeight: '250px', overflowY: 'auto' }}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.teacherName}
                description={item.message}
              />
            </List.Item>
          )}
        />
      </ScrollElement>
    </Card>
  );
};

export default TeacherMessageBoard;
