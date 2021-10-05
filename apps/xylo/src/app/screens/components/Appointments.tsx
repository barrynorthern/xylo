
import { useState, useEffect } from 'react';
import { IAppointmentRow, ICounsellorModel } from '@xylo/booking-services';

export interface IAppointmentBooking {
  id: string;
  counsellor: ICounsellorModel;
  date: string;
  time: string;
}

interface IAppointmentRowProps {
  row: IAppointmentRow;
  onSelect: (id: IAppointmentBooking) => void;
}
function AppointmentRow({row, onSelect}: IAppointmentRowProps) {

    const appointment = row.appointments[0];
    const counsellor = appointment.counsellor;

    const selectRow = () => {
      onSelect({
        id: appointment.id,
        counsellor: counsellor,
        date: row.date,
        time: row.time
      });
    };
  
    return (
      <div className="flex justify-between cursor-pointer hover:bg-teal" onClick={selectRow}>
        <div className="flex">
          <div className="ml-1">{row.time}</div>
        </div>
        <div>{counsellor.name}</div>
      </div>
      
    );
  }
  
  interface IAppointmentProps {
    appointments: IAppointmentRow[];
    onSelect: (id: IAppointmentBooking) => void;
  }
  
  export function Appointments({appointments = [], onSelect}: IAppointmentProps) {
  
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
              {dates[x].map(x => <li key={x.appointments[0].id}><AppointmentRow row={x} onSelect={onSelect} /></li>)}
            </li>
          );
        })}
      </ul>
    );
  }
  