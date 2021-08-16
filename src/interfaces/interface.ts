// import { createContext } from "react";

export interface OrdersData {
  id: string;
  destination: string;
}

export interface FlightData {
  flight_number: number;
  departure_city: string;
  arrival_city: string;
  day: number;
}
// export interface ConsentsContextValues {
//   repoName: string;
// }

// export const ConsentsContext = createContext({} as ConsentsContextValues);
