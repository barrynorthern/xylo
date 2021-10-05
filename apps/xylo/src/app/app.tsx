import { useEffect, useRef } from 'react';
import { useAppState } from "./AppStateContext";
import { GetAppData } from '@xylo/booking-services';
import { Header } from './components/Header';
import { AppointmentScreen } from './screens/AppointmentScreen';

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