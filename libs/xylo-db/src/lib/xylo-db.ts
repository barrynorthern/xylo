import availability_data from './collections/availability-mock.json';
import counsellor_data from './collections/counsellor-mock.json';

export interface IAppointmentDataModel {
    id: string;
    datetime: string;
}

export interface ICounsellorDataModel {
    id: string,
    firstName: string;
    lastName: string;
    appointment_types: string[];
    appointment_mediums: string[];
    specialisms: string[];
}

export function GetAvailability(): {[counsellor: string]: IAppointmentDataModel[]} {
    return availability_data;
}

export function GetCounsellors(): ICounsellorDataModel[] {
    return counsellor_data;
}

export function QueryCounsellors(types: string[] | null, mediums: string[] | null, specialisms: string[] | null): ICounsellorDataModel[] {
    return GetCounsellors().filter(counsellor => 
       (!types || counsellor.appointment_types.some(appointment_type => types.includes(appointment_type)))
    && (!mediums || counsellor.appointment_mediums.some(appointment_medium => mediums.includes(appointment_medium)))
    && (!specialisms || specialisms.length == 0 || counsellor.specialisms.some(specialism => specialisms.includes(specialism))));
}