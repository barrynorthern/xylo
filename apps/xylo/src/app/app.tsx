import React, { useState, useEffect } from 'react';
import { 
  AppointmentType, 
  AppointmentMedium, 
  GetAppData,
  QueryAppointments,
  IAppointmentRow
} from '@xylo/booking-services';
import { json } from 'express';

function AppointmentRow({date, time, appointments}: IAppointmentRow) {

  const counsellor = appointments[0].counsellor;

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="font-bold w-32">{date}</div>
        <div className="ml-1">{time}</div>
      </div>
      <div>{counsellor.name}</div>
    </div>
    
  );
}

interface IAppointmentFilters {
  appointmentType: AppointmentType,
  appointmentMediums: AppointmentMedium[] | null;
  specialisms: string[] | null;
}

function Appointments({appointmentType = 'one-off', appointmentMediums, specialisms}: IAppointmentFilters) {

  const defaultAppointments: IAppointmentRow[] = [];
  const [appointments, setAppointments] = useState(defaultAppointments);

  useEffect(() => {
    QueryAppointments([appointmentType], appointmentMediums, specialisms, 0, 10000).then((r) => setAppointments(r.data))
  },
  [
    appointmentType,
    appointmentMediums,
    specialisms
  ]);

  return (
    <ul>{appointments.map(x => <li><AppointmentRow date={x.date} time={x.time} appointments={x.appointments}/></li>)}</ul>
  );
}

function AppointmentScreen({show}: {show: boolean}) {
  return show 
  ? (
    <Appointments appointmentType={'consultation'} appointmentMediums={null} specialisms={null}></Appointments>
  )
  : (
    <div>Loading ...</div>
  );
}

export function App() {
  
  const [appData, setAppData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [navigation, setNavigation] = useState('appointments');

  useEffect(() => {
    GetAppData().then((data) => { setAppData(data); setLoaded(true); }, () => console.error);

  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-sans text-lg font-bold py-4">Bookings</h1>
      <AppointmentScreen show={loaded && navigation === 'appointments'}/>
    </div>
  );
}

export default App;
