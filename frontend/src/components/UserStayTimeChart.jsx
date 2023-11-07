import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [100, 200, 300, 400, 150, 200, 10];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

function UserStayTimeChart() {
  return (
    <LineChart
      width={900}
      height={600}
      series={[
        { data: uData, label: 'the time u spend' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}

export default UserStayTimeChart;