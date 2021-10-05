import React, { useState, useEffect, useRef } from 'react';
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
import { Header } from './components/Header';

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

function Appointments({appointments = []}: IAppointmentProps) {

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

interface IRadioSelectProps {
  defaultValue: string;
  group: string,
  options: string[] | undefined;
  optionSelected: (type: string) => void;
  localisation: {[key: string]: string};
}

function RadioSelect({defaultValue, group, options, optionSelected, localisation}: IRadioSelectProps) {
  const handleChange = (option: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    optionSelected(option);
  };
  return !options
  ? (<div></div>)
  : (
    <fieldset className="flex h-6 flex-col md:flex-row">
      {options.map((option) => (
      <p className="flex align-middle mr-4 cursor-pointer" key={option}>
        <input 
          type="radio" 
          className="mt-1 cursor-pointer"
          id={option}
          value={option}
          name={group}
          defaultChecked={option === defaultValue}
          onChange={handleChange(option)}
        />
        <label htmlFor={option} className="ml-2 cursor-pointer whitespace-nowrap">{localisation[option]}</label>
      </p>))}
    </fieldset>
  );
}

interface ICheckboxProps {
  id: string,
  name: string,
  initialChecked: boolean,
  onChange: (checked: boolean) => void;
}

function Checkbox({id, name, initialChecked, onChange}: ICheckboxProps) {
  const [checked, setChecked] = useState(initialChecked);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
    setTimeout(() => onChange(e.target.checked), 0);
  };
  useEffect(() => setChecked(initialChecked), [initialChecked]);
  return (
    <div className="flex mr-4 cursor-pointer">
      <input className="mt-1 cursor-pointer" id={id} type="checkbox" checked={checked} onChange={handleChange}/>
      <label htmlFor={id} className="ml-2 cursor-pointer">{name}</label>
    </div>
  );
}

interface IMultiSelectProps {
  options: string[] | undefined;
  defaultValues: string[];
  optionSelected: (type: string) => void;
  optionDeselected: (type: string) => void;
  localisation: {[key: string]: string} | null;
}

function MultiSelect({options, defaultValues, optionSelected, optionDeselected, localisation}: IMultiSelectProps) {
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
    <fieldset className="flex flex-wrap mb-4">
      {options.map((option) => (
      <Checkbox 
        key={option}
        id={option}
        name={localisation ? localisation[option] : option}
        initialChecked={defaultValues.includes(option)}
        onChange={handleChange(option)}/>
      ))}
    </fieldset>
  );
}

interface IButtonProps {
  text: string;
  onPress: () => void;
}

function Button({text, onPress}: IButtonProps) {
  return (
    <div className="bg-gradient-to-r from-duckegg to-lightblue hover:shadow-md rounded-md cursor-pointer h-6 py-1 px-3 text-xs font-bold text-black uppercase" onClick={(e) => onPress()}>{text}</div>
  );
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

  useEffect(() => {
    let mounted = true; 
    console.log("fetch", JSON.stringify(state.filter));
    QueryAppointments(
        [state.filter.type], state.filter.mediums, state.filter.specialisms, 0, 10000)
        .then((r) => {
          if (mounted) {
            dispatch({type: "set_appointments", payload: r.data});    
          }
        },
        () => console.error);
        return () => { mounted = false };
  },  
  [
    state.filter,
    dispatch
  ]);

  const typeSelected = (type: string) => {
    dispatch({type: 'set_filter_type', payload: type as AppointmentType});
  }

  const mediumSelected = (type: string) => {
    dispatch({type: 'add_filter_medium', payload: type as AppointmentMedium});
  }
  
  const mediumDeselected = (type: string) => {
    dispatch({type: 'remove_filter_medium', payload: type as AppointmentMedium});
  }

  const specialismSelected = (type: string) => {
    dispatch({type: 'add_filter_specialism', payload: type as string});
  }
  
  const specialismDeselected = (type: string) => {
    dispatch({type: 'remove_filter_specialism', payload: type as string});
  }

  const clearFilters = () => {
    dispatch({type: 'reset_filter'});
  }

  return show 
  ? (
    <div className="flex flex-col">
      <div className="bg-gray my-4 rounded-xl shadow-md flex-shrink-0">
        <div className="flex justify-between content-center py-4 bg-darkgray px-8 rounded-t-xl text-white">
          <h1 className="font-sans text-lg font-bold">Find and book an appointment</h1>
          <RadioSelect 
            group="type"
            defaultValue={state.filter.type}
            options={state.appointmentData?.appointmentTypes} 
            optionSelected={typeSelected}
            localisation={localisation.type}/>
        </div>
        <div className="flex divide-x divide-current px-8">
          <div> 
            <h2 className="font-sans text-md font-bold py-2">Mediums</h2>
            <MultiSelect 
              options={state.appointmentData?.appointmentMediums} 
              defaultValues={state.filter.mediums}
              optionSelected={mediumSelected}
              optionDeselected={mediumDeselected}
              localisation={localisation.mediums}/>
          </div>
          <div className="pl-4">
            <div className="flex">
              <h2 className="font-sans text-md font-bold py-2">Specialisms</h2>
              <div className="mt-2 ml-2">
                <Button text="clear" onPress={clearFilters}></Button>
              </div>
            </div>
            <MultiSelect 
              options={state.appointmentData?.specialisms} 
              defaultValues={state.filter.specialisms}
              optionSelected={specialismSelected}
              optionDeselected={specialismDeselected}
              localisation={null}/>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <Appointments appointments={state.appointments}/>
      </div>
    </div>
  )
  : (
    <div>Loading ...</div>
  );
}

export function App() {
  
  const {state, dispatch} = useAppState();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    GetAppData().then(
      (data) => { 
        if (mounted.current) {
          console.log(data); 
          dispatch({type: 'set_appointment_data', payload: data}); 
        }
      }, 
      () => console.error);
    return () => { mounted.current = false; }
  }, []);

  return (
    <div className="bg-white w-screen flex flex-col h-screen">
      <Header/>
      <div className="container mx-auto md:w-10/12 lg:w-3/4 xl:w-1/2 w-full flex-1 px-8 overflow-y-auto">
        <div>
          <AppointmentScreen show={state.loaded && state.navigation === 'appointments'}/>
        </div>
      </div>
    </div>
  );
}

export default App;