import React, { createContext, useReducer, useContext } from "react";

import {
  AppointmentType,
  AppointmentMedium,
  IAppointmentData,
  IAppointmentRow,
} from '@xylo/booking-services';

export interface AppState {
  loaded: boolean;
  appointmentData: IAppointmentData | null;
  navigation: string;
  filter: IAppointmentFilter;
  appointments: IAppointmentRow[];
}

export interface IAppointmentFilter {
  type: AppointmentType;
  mediums: AppointmentMedium[];
  specialisms: string[];
}

const getDefaultFilter: () => IAppointmentFilter = () => {
  return {
    type: 'one_off',
    mediums: ['phone', 'video'],
    specialisms: [],
  };
}

export const defaultAppState: AppState = {
  loaded: false,
  appointmentData: null,
  navigation: 'appointments',
  filter: getDefaultFilter(),
  appointments: []
};

interface AppStateContextProps {
    state: AppState,
    dispatch: React.Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider = ({ children }: React.PropsWithChildren<React.ReactNode>) => {
    const [state, dispatch] = useReducer(appStateReducer, defaultAppState)
    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
  return useContext(AppStateContext);
}

export type Action =
  | {
    type: "set_appointment_data"
    payload: IAppointmentData
  }
  | {
    type: "set_navigation"
    payload: string
  }
  | {
    type: "set_filter_type"
    payload: AppointmentType
  }
  | {
    type: "add_filter_medium"
    payload: AppointmentMedium
  }
  | {
    type: "remove_filter_medium"
    payload: AppointmentMedium
  }
  | {
    type: "add_filter_specialism"
    payload: string
  }
  | {
    type: "remove_filter_specialism"
    payload: string
  }
  | {
    type: "reset_filter"
  }
  | {
    type: "set_appointments",
    payload: IAppointmentRow[]
  }

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch(action.type) {
    case "set_appointment_data": {
      return {...state, loaded: true, appointmentData: action.payload};
    }
    case "set_navigation": {
      return {...state, navigation: action.payload};
    }
    case "set_filter_type": {
      return {...state, filter: {...state.filter, type: action.payload}};
    }
    case "add_filter_medium": {
      return {...state, filter: {...state.filter, mediums: [...state.filter.mediums, action.payload]}};
    }
    case "remove_filter_medium": {
      return {...state, filter: {...state.filter, mediums: state.filter.mediums.filter((medium) => action.payload !== medium)}};
    }
    case "add_filter_specialism": {
      return {...state, filter: {...state.filter, specialisms: [...state.filter.specialisms, action.payload]}};
    }
    case "remove_filter_specialism": {
      return {...state, filter: {...state.filter, specialisms: state.filter.specialisms.filter((specialism) => action.payload !== specialism)}};
    }
    case "reset_filter": {
      return {...state, filter: getDefaultFilter()};
    }
    case "set_appointments": {
      return {...state, appointments: action.payload};
    }
    default: {
      return state;
    }
  }
}