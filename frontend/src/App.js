import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';

function App() {
  const [karmaData, setKarmaData] = useState({});

  useEffect(() => {
    fetch('/status')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      <Dashboard data={karmaData} />
      <AICoach />
    </div>
  );
}

export default App;