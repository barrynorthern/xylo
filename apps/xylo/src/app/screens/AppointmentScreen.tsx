
import { useEffect, useRef } from 'react';
import { useAppState } from "../AppStateContext";

import { 
  AppointmentType, 
  AppointmentMedium, 
  QueryAppointments
} from '@xylo/booking-services';

import { Appointments, IAppointmentBooking } from './components/Appointments';
import { RadioSelect } from '../components/RadioSelect';
import { MultiSelect } from '../components/MultiSelect';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';

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

export interface IAppointmentScreenProps {
    show: boolean;
    onSelectAppointment: (appointment: IAppointmentBooking) => void;
}

export function AppointmentScreen({show, onSelectAppointment}: IAppointmentScreenProps) {
  
  const {state, dispatch} = useAppState();

  useEffect(() => {
    let mounted = true; 
    dispatch({type: "set_appointments", payload: []}); 
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
        {state.appointments.length === 0 ?
         <div className="opacity-50">No Appointments Found</div> : 
         <Appointments appointments={state.appointments} onSelect={onSelectAppointment}/>}
      </div>
    </div>
  )
  : (
    <div></div>
  );
}