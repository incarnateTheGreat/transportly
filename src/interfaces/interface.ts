import { Dispatch, createContext, SetStateAction } from "react";

export interface OrdersData {
  id: string;
  destination: string;
}

export interface FlightData {
  flight_number: number;
  departure_city: string;
  arrival_city: string;
  day: number;
  orders: OrdersData[];
}

export interface TransportlyContextValues {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  flightOrderData: FlightData[];
  setFlightOrderData: Dispatch<SetStateAction<FlightData[]>>;
  combinedFlightOrderData: FlightData[] | null;
  setCombinedFlightOrderData: Dispatch<SetStateAction<FlightData[]>>;
}

export const TransportlyContext = createContext({} as TransportlyContextValues);
