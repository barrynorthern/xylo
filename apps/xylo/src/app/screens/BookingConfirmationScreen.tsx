import { IAppointmentBooking } from './components/Appointments';
import { Button } from '../components/Button';

export interface IBookingConfirmationScreenProps {
  show: boolean;
  booking: IAppointmentBooking | null;
  onCancel: () => void;
}

export function BookingConfirmationScreen({
  show,
  booking,
  onCancel
}: IBookingConfirmationScreenProps) {
  return show && booking ? (
    <div className="flex flex-col">
      <div className="bg-gray my-4 rounded-xl shadow-md flex-shrink-0">
        <div className="flex justify-between content-center py-4 bg-darkgray px-8 rounded-t-xl text-white">
          <h1 className="font-sans text-lg font-bold">
            You have booked the following appointment
          </h1>
        </div>
        <div className="flex flex-col p-8 text-center">
            <div className="flex text-lg m-auto">
                <label className="font-bold">{booking.date}</label>
                <label className="ml-2">{booking.time} (1h)</label>
            </div>
            <label className="text-lg">{booking.counsellor.name}</label>
        </div>
        <div className="w-32 m-auto pb-8">
            <Button text="Close" onPress={onCancel}/>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
