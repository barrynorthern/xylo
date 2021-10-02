import { ICounsellorDataModel, GetAvailability, GetCounsellors, QueryCounsellors } from '@xylo/xylo-db';

export interface IPagedResponseModel<TData> {
    total: number;
    data: TData[];
    size: number;
}

export type AppointmentType = 'consultation' | 'one-off';
export type AppointmentMedium = 'phone' | 'video';

export interface ICounsellor {
    name: string,
    appointmentTypes: AppointmentType[],
    appointmentMediums: AppointmentMedium[];
    specialisms: string[];
}

interface IAppointmentEntry {
  id: string;
  datetime: string;
  counsellor: string;
}

export interface IAppointment {
  id: string;
  counsellor: string;
}

export interface IAppointmentRow {
  datetime: string;
  appointments: IAppointment[];
}

function FilterAppointments(counsellors: string[]): IAppointmentEntry[] {
    const array = Object.entries(GetAvailability());
    const filtered = array.filter(([counsellor, _]) => counsellors.includes(counsellor));
    return filtered.map(x => x[1].map(appointment => { return { counsellor: x[0], id: appointment.id, datetime: appointment.datetime }})).flat();
}

function MapCounsellorIds(counsellors: ICounsellorDataModel[]) {
  return counsellors?.map(counsellor => counsellor.id) || [];
}

export async function QueryAppointments(types: string[] | null, mediums: string[] | null, specialisms: string[] | null, skip: number, take: number): Promise<IPagedResponseModel<IAppointmentRow>> {
    
    const match = QueryCounsellors(types, mediums, specialisms);
    const counsellors = MapCounsellorIds(match);
    const appointments = FilterAppointments(counsellors).sort((a, b) => { return a.datetime.localeCompare(b.datetime, undefined, { numeric: true, sensitivity: 'base' }); });
    const groups = appointments.reduce((rv: {[key: string]: any}, x) => { (rv[x.datetime] = rv[x.datetime] || []).push({counsellor: x.counsellor, id: x.id}); return rv; }, {});
    const page = Object.entries(groups).slice(skip, skip + take).map(x => { return { datetime: x[0], appointments: <IAppointment[]>x[1] }; });
   
    return {
        total: Object.keys(groups).length,
        data: page,
        size: page.length
    }
}

export async function GetAppointmentTypes(): Promise<AppointmentType[]> {
    return ['consultation', 'one-off'];
}

export async function GetAppointmentMediums(): Promise<AppointmentMedium[]> {
    return ['phone', 'video'];
}

export async function GetSpecialisms(): Promise<string[]> {
    const allSpecialisms = GetCounsellors()
        .map(counsellor => counsellor.specialisms)
        .flat();
    return [...new Set(allSpecialisms)].sort();
}

export interface IAppointmentData {
    appointmentTypes: AppointmentType[];
    appointmentMediums: AppointmentMedium[];
    specialisms: string[];
}

export async function GetAppData(): Promise<IAppointmentData> {
    return Promise.all([
        GetAppointmentTypes(),
        GetAppointmentMediums(),
        GetSpecialisms(),
    ])
    .then((values) => {
        return {
            appointmentTypes: values[0],
            appointmentMediums: values[1],
            specialisms: values[2]
        };
    });
}