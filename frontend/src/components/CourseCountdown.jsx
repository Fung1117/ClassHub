import React, { useState, useEffect } from 'react';
import { Line } from 'rc-progress';

const CourseCountdown = () => {
  const totalMilliseconds = 60 * 1000; // 1 minute in milliseconds
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedMilliseconds = Date.now() - startTime;
      const increasingProgress = (elapsedMilliseconds / totalMilliseconds) * 100;
      if (increasingProgress <= 100) {
        setProgress(increasingProgress);
      } else {
        setProgress(100);
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [totalMilliseconds, startTime]);

  const calculateTimeLeft = () => {
    const remainingMilliseconds = totalMilliseconds - (Date.now() - startTime);
    if (remainingMilliseconds < 0) {
      return 'Time to Lession'
    }
    const seconds = Math.floor((remainingMilliseconds / 1000) % 60);
    const minutes = Math.floor((remainingMilliseconds / 1000 / 60) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h1>Linear Progress Bar: {calculateTimeLeft()}</h1>
      <Line percent={progress} strokeWidth={4} strokeColor="#007bff" />
    </div>
  );
};

export default CourseCountdown;
