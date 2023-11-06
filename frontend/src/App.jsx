import { useState, useEffect } from 'react'
import Statistic from './pages/Statistics';

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
      <Statistic />
    </>
  )
}

export default App
