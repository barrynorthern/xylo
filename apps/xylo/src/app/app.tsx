import React, { useState, useEffect } from 'react';
import { 
  AppointmentType, 
  AppointmentMedium, 
  GetAppData,
  QueryAppointments 
} from '@xylo/booking-services';

export function App() {
  
  const [appData, setAppData] = useState({});

  useEffect(() => {
    GetAppData()
      .then((data) => { console.log(data); setAppData(data) }, () => console.error);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-sans text-lg font-bold py-4">Bookings</h1>
      <div>{JSON.stringify(appData)}</div>
    </div>
  );
}

export default App;
