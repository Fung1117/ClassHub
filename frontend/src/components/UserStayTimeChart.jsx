import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

function UserStayTimeChart({ data }) {
  const { time, date } = data;
  console.log(data)
  return (
    <LineChart
      width={900}
      height={600}
      series={[
        { data: time, label: 'the time u spend' },
      ]}
      xAxis={[{ scaleType: 'point', data: date }]}
    />
  );
}

export default UserStayTimeChart;
