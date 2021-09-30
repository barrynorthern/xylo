export type AppointmentType = 'consultation' | 'one-off';
export type AppointmentMedium = 'phone' | 'video';

export interface ICounsellor {
    name: string,
    appointmentTypes: AppointmentType[],
    appointmentMediums: AppointmentMedium[];
    specialisms: string[];
}

export function GetCounsellor(id: string): ICounsellor {
    return {
        name: "John Doe",
        appointmentTypes: ['consultation'],
        appointmentMediums: ['video'],
        specialisms: []
    };
}
