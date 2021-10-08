import { useEffect, useRef, Suspense } from 'react';
import { useAppState } from "./AppStateContext";
import { GetAppData } from '@xylo/booking-services';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { AppointmentScreen } from './screens/AppointmentScreen';
import { BookingConfirmationScreen } from './screens/BookingConfirmationScreen';
import { IAppointmentBooking } from './screens/components/Appointments';

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

  const onSelectAppointment = (appointment: IAppointmentBooking) => {
    dispatch({type: 'set_booking', payload: appointment});
    dispatch({type: 'set_navigation', payload: 'confirmation'});
  }

  const onClearAppointment = () => {
    dispatch({type: 'set_booking', payload: null});
    dispatch({type: 'set_navigation', payload: 'appointments'});
  }

  return (
    <div className="bg-white w-screen flex flex-col h-screen">
      <Header/>
      <div className="container mx-auto md:w-10/12 lg:w-3/4 xl:w-1/2 w-full flex-1 px-8 overflow-y-auto">
        <div>
          <Loader show={state.loaded === false}/>
          <AppointmentScreen show={state.loaded && state.navigation === 'appointments'} onSelectAppointment={onSelectAppointment}/>
          <BookingConfirmationScreen show={state.navigation === 'confirmation'} booking={state.booking} onCancel={onClearAppointment}/>
        </div>
      </div>
    </div>
  );
}

export default App;
