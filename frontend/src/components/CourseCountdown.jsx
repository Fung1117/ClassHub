import React from 'react';
import { Grid, LinearProgress } from '@mui/material';

const deadline = Date.now() + 1000 * 60 * 10;
const totalDuration = 1000 * 60 * 10;

const CourseCountdown = () => {
  const timeRemaining = deadline - Date.now();
  const progressPercentage = ((totalDuration - timeRemaining) / totalDuration) * 100;

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{ height: '30px' }}
        />
      </Grid>
    </Grid>
  );
};

export default CourseCountdown;
