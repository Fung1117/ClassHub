import React from 'react';
import { List } from 'antd';

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
    <div>
      <h1>Teacher Message Board</h1>
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
    </div>
  );
};

export default TeacherMessageBoard;
