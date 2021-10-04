import React, { useState, useEffect } from 'react';
import { 
  useAppState, 
  Action,
  IAppointmentFilter 
} from "./AppStateContext";
import { 
  AppointmentType, 
  AppointmentMedium, 
  GetAppData,
  QueryAppointments,
  IAppointmentRow,
} from '@xylo/booking-services';

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

interface IAppointmentProps {
  appointments: IAppointmentRow[];
}

function Appointments({appointments = []}: IAppointmentProps) {
  return (
    <ul>{appointments.map(x => <li key={x.appointments[0].id}><AppointmentRow date={x.date} time={x.time} appointments={x.appointments}/></li>)}</ul>
  );
}

interface IRadioSelectProps {
  group: string,
  options: string[] | undefined;
  optionSelected: (type: string) => void;
  localisation: {[key: string]: string};
}

function RadioSelect({group, options, optionSelected, localisation}: IRadioSelectProps) {
  const handleChange = (option: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    optionSelected(option);
  };
  return !options
  ? (<div className="mb-4"></div>)
  : (
    <fieldset className="flex mb-4">
      {options.map((option) => (
      <p className="flex align-middle mr-4" key={option}>
        <input 
          type="radio" 
          className="mt-1 cursor-pointer"
          id={option}
          value={option}
          name={group}
          onChange={handleChange(option)}
        />
        <label htmlFor={option} className="ml-2 cursor-pointer">{localisation[option]}</label>
      </p>))}
    </fieldset>
  );
}

interface ICheckboxProps {
  id: string,
  name: string,
  onChange: (checked: boolean) => void;
}

function Checkbox({id, name, onChange}: ICheckboxProps) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    onChange(checked);
  };
  return (
    <div className="flex mr-4 cursor-pointer">
      <input className="mt-1 cursor-pointer" id={id} type="checkbox" checked={checked} onChange={handleChange}/>
      <label htmlFor={id} className="ml-2 cursor-pointer">{name}</label>
    </div>
  );
}

interface IMultiSelectProps {
  options: string[] | undefined;
  optionSelected: (type: string) => void;
  optionDeselected: (type: string) => void;
  localisation: {[key: string]: string};
}

function MultiSelect({options, optionSelected, optionDeselected, localisation}: IMultiSelectProps) {
  const handleChange = (option: string) => (checked: boolean) => {
    console.log("ms", option, checked);
    if(checked) {
      optionSelected(option);
     }
     else {
       optionDeselected(option);
     }
  };
  return !options
  ? (<div className="mb-4"></div>)
  : (
    <fieldset className="flex mb-4">
      {options.map((option) => (
      <Checkbox 
        key={option}
        id={option}
        name={localisation[option]}
        onChange={handleChange(option)}/>
      ))}
    </fieldset>
  );
}

function fetchAppointments(filter: IAppointmentFilter, dispatch: React.Dispatch<Action>) {
  console.log("fetch", JSON.stringify(filter));
  QueryAppointments(
      [filter.type], filter.mediums, filter.specialisms, 0, 10000)
      .then(
        (r) => dispatch({type: "set_appointments", payload: r.data}),
        () => console.error);
}

// TODO: do localisation properly
const localisation =
{
  "type": {
    "consultation": "Consultation",
    "one_off": "One Off"
  },
  "mediums": {
    "phone": "Phone",
    "video": "Video"
  }
};

function AppointmentScreen({show}: {show: boolean}) {
  
  const {state, dispatch} = useAppState();

  useEffect(() => fetchAppointments(state.filter, dispatch), []);

  const typeSelected = (type: string) => {
    dispatch({type: 'set_filter_type', payload: type as AppointmentType});
    fetchAppointments(state.filter, dispatch);
  }

  const mediumSelected = (type: string) => {
    dispatch({type: 'add_filter_medium', payload: type as AppointmentMedium});
    fetchAppointments(state.filter, dispatch);
  }
  
  const mediumDeselected = (type: string) => {
    dispatch({type: 'remove_filter_medium', payload: type as AppointmentMedium});
    fetchAppointments(state.filter, dispatch);
  }

  return show 
  ? (
    <div>
      <RadioSelect 
        group="type"
        options={state.appointmentData?.appointmentTypes} 
        optionSelected={typeSelected}
        localisation={localisation.type}/>
      <MultiSelect 
        options={state.appointmentData?.appointmentMediums} 
        optionSelected={mediumSelected}
        optionDeselected={mediumDeselected}
        localisation={localisation.mediums}/>
      <Appointments appointments={state.appointments}/>
    </div>
  )
  : (
    <div>Loading ...</div>
  );
}

export function App() {
  
  const {state, dispatch} = useAppState();

  useEffect(() => {
    GetAppData().then(
      (data) => { console.log(data); dispatch({type: 'set_appointment_data', payload: data}); }, 
      () => console.error);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-sans text-lg font-bold py-4">Bookings</h1>
      <AppointmentScreen show={state.loaded && state.navigation === 'appointments'}/>
    </div>
  );
}

export default App;
