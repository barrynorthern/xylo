
import { useState, useEffect } from 'react';
import { IAppointmentRow } from '@xylo/booking-services';

function AppointmentRow({date, time, appointments}: IAppointmentRow) {

    const counsellor = appointments[0].counsellor;
  
    return (
      <div className="flex justify-between">
        <div className="flex">
          <div className="ml-1">{time}</div>
        </div>
        <div>{counsellor.name}</div>
      </div>
      
    );
  }
  
  interface IAppointmentProps {
    appointments: IAppointmentRow[];
  }
  
  export function Appointments({appointments = []}: IAppointmentProps) {
  
    const emptyDates: {[date: string]: IAppointmentRow[]} = {};
    const [dates, setDates] = useState(emptyDates);
    
    useEffect(() => {
      setDates(appointments.reduce((acc: {[date: string]: IAppointmentRow[]}, value) => {
        acc[value.date] = acc[value.date] || [];
        acc[value.date].push(value);
        return acc;  
      }, {}));
    }, [appointments]);
  
    return (
      <ul>
        {Object.keys(dates).map(x => {
          return (
            <li key={x}>
              <div className="font-bold my-2">{x}</div>
              {dates[x].map(x => <li key={x.appointments[0].id}><AppointmentRow date={x.date} time={x.time} appointments={x.appointments}/></li>)}
            </li>
          );
        })}
      </ul>
    );
  }
  