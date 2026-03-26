import React, { useEffect, useState } from 'react';

const TimeZones = {
  UTC: 'UTC',
  EST: 'America/New_York',
  PST: 'America/Los_Angeles',
  CET: 'Europe/Berlin',
  IST: 'Asia/Kolkata',
  JST: 'Asia/Tokyo',
  AEST: 'Australia/Sydney',
};

const WorldClock = () => {
  const [time, setTime] = useState({});

  const updateTime = () => {
    const currentTime = {};
    Object.keys(TimeZones).forEach(zone => {
      currentTime[zone] = new Date().toLocaleString('en-US', { timeZone: TimeZones[zone] });
    });
    setTime(currentTime);
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>World Clock</h1>
      <ul>
        {Object.keys(time).map(zone => (
          <li key={zone}>{zone}: {time[zone]}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorldClock;
