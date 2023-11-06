import React from 'react';
import { Card } from 'antd';

const UserActivity = () => {
  // Static data for testing
  const totalTimeInMinutes = 342; // 5 hours 42 minutes

  const hours = Math.floor(totalTimeInMinutes / 60);
  const minutes = totalTimeInMinutes % 60;

  return (
    <Card title="User Activity">
      <p> <strong>Last Login:</strong> 2023-11-01 15:30:00</p>
      <p> <strong>Total Time in System:</strong> {hours > 0 && `${hours} hours`} {minutes > 0 && `${minutes} minutes`}</p>
    </Card>
  );
};

export default UserActivity;
