import { useState, useEffect } from 'react'
import Timetable from './components/TimeTable';
import LineChart from './components/StatisticsPage';
import UserActivity from './components/UserActivity';

function App() {

  useEffect(() => {
    fetch('http://localhost:5000/flask')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed.');
        }
      })
      .then(data => {
        console.log("SUCCESS", data);
        setGetMessage(data);
      })
      .catch(error => {
        console.log(error);
      });
  })

  return (
    <>
      <UserActivity>

      </UserActivity>
    </>
  )
}

export default App
