import React, { useState, useEffect } from 'react';
import star from './star.svg';
import { GetCounsellor } from '@xylo/booking-services';

export function App() {

  useEffect(() => {
    console.log(JSON.stringify(GetCounsellor("dummy")));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-sans text-lg font-bold py-4">Bookings</h1>
    </div>
  );
}

export default App;
