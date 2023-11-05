import React from 'react';
import { Col, Row } from 'antd';
import CountdownClock from 'react-countdown-clock';

// Set the deadline for the upcoming course (static data)
const deadline = Date.now() + 1000 * 60 * 10; // 7 days from now

const CourseCountdown = () => {
  const timeRemaining = deadline - Date.now();
  const isCloseToStart = timeRemaining < 1000 * 60 * 1; // 15 minutes

  return (
      <Row gutter={16} justify="center">
        <Col xs={24} sm={12} md={8} lg={6}>
          <div>
            <CountdownClock
              seconds={Math.floor(timeRemaining / 1000)}
              color={isCloseToStart ? '#FF0000' : '#FFA500'}
              alpha={0.8}
              size={100}
              onComplete={() => console.log('Countdown finished!')}
            />
          </div>
        </Col>
      </Row>
  );
};

export default CourseCountdown;