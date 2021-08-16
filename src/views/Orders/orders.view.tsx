import { useEffect } from "react";
import { FlightData } from "interfaces/interface";
import useOrders from "hooks/useOrders";
import useFlights from "hooks/useFlights";

const destinations = ["YYZ", "YVR", "YYC"];

const Orders = () => {
  const ordersRepoName = "ordersRepo";
  const flightsRepoName = "flightsRepo";
  const { data: orders } = useOrders(ordersRepoName, destinations);
  const { data: flights } = useFlights(flightsRepoName);

  // Create an  merged output with order number and flight info.
  useEffect(() => {
    if (orders && flights) {
      const objOrders = orders.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];

        acc[key] = curr[key];

        return acc;
      }, {});

      //   console.log(objOrders);

      for (const flight in flights) {
        for (const arrival of destinations) {
          const findFlight: FlightData = flights[flight].find((flight) => {
            return flight.arrival_city === arrival;
          });

          findFlight.orders = objOrders[arrival].splice(0, 20);
        }
      }

      console.log(flights);
    }
  }, [orders, flights]);

  return <div>Orders.</div>;
};

export default Orders;
