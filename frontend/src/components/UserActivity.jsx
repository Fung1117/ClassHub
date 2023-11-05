import React from 'react';
import { Card, ClockCircleOutlined, HourglassOutlined } from 'antd';

const UserActivityBlock = () => {
  // Static data for testing
  const totalTimeInMinutes = 342; // 5 hours 42 minutes

  const hours = Math.floor(totalTimeInMinutes / 60);
  const minutes = totalTimeInMinutes % 60;

  return (
    <Card title="User Activity">
      <p><ClockCircleOutlined /> <strong>Last Login:</strong> 2023-11-01 15:30:00</p>
      <p><HourglassOutlined /> <strong>Total Time in System:</strong> {hours > 0 && `${hours} hours`} {minutes > 0 && `${minutes} minutes`}</p>
    </Card>
  );
};

export default UserActivityBlock;
