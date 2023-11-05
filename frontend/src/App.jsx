import { useState, useEffect } from 'react'
import CourseCountdown from './components/CourseCountdown';

function App() {

  useEffect(() => {
    fetch('http://localhost:5000/')
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
      <CourseCountdown />
      
    </>
  )
}

export default App
