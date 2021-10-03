import { ICounsellorDataModel, GetAvailability, GetCounsellors, QueryCounsellors } from '@xylo/xylo-db';
import { join } from 'path';
import { stringify } from 'querystring';

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

export interface ICounsellorModel {
    id: string;
    name: string;
}

export interface IAppointment {
  id: string;
  counsellor: ICounsellorModel;
}

export interface IAppointmentRow {
  date: string;
  time: string;
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

const dateFormat = new Intl.DateTimeFormat("en-GB", {year: 'numeric', month: 'long', day: '2-digit'});
const timeFormat = new Intl.DateTimeFormat("en-GB", {hour: '2-digit', minute: '2-digit'});

function createDate(date: string): string {
    return dateFormat.format(Date.parse(date));
}

function createTime(date: string): string {
    return timeFormat.format(Date.parse(date));
}

export async function QueryAppointments(types: string[] | null, mediums: string[] | null, specialisms: string[] | null, skip: number, take: number): Promise<IPagedResponseModel<IAppointmentRow>> {
    
    const match = QueryCounsellors(types, mediums, specialisms);
    const getCounsellorName = (id: string) => {
        const counsellor = match.find(x => x.id == id);
        return [counsellor?.firstName, counsellor?.lastName].filter(x => !!x).join(' ');
    }
    const counsellors = MapCounsellorIds(match);
    const appointments = FilterAppointments(counsellors).sort((a, b) => { return a.datetime.localeCompare(b.datetime, undefined, { numeric: true, sensitivity: 'base' }); });
    const groups = appointments.reduce((rv: {[key: string]: any}, x) => { (rv[x.datetime] = rv[x.datetime] || []).push({counsellor: { id: x.counsellor, name: getCounsellorName(x.counsellor) }, id: x.id}); return rv; }, {});
    const page = Object.entries(groups).slice(skip, skip + take).map(x => { return { date: createDate(x[0]), time: createTime(x[0]), appointments: <IAppointment[]>x[1] }; });
   
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

async function SimulateNetwork(): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, 1000));
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
        SimulateNetwork()
    ])
    .then((values) => {
        return {
            appointmentTypes: values[0],
            appointmentMediums: values[1],
            specialisms: values[2]
        };
    });
}