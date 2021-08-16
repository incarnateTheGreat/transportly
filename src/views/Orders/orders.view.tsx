import { useContext, useEffect, useState } from "react";
import { FlightData, TransportlyContext } from "interfaces/interface";
import useOrders from "hooks/useOrders";
import useFlights from "hooks/useFlights";

const destinations = ["YYZ", "YVR", "YYC"];

const Orders = () => {
  const { flightOrderData, setFlightOrderData } =
    useContext(TransportlyContext);
  const ordersRepoName = "ordersRepo";
  const flightsRepoName = "flightsRepo";
  const { isLoading: isOrdersLoading, data: orders } = useOrders(
    ordersRepoName,
    destinations
  );
  const [combinedOrders, setCombinedOrders] = useState<FlightData[]>([]);
  const { isLoading: isFlightsLoading, data: flights } =
    useFlights(flightsRepoName);

  // Create an  merged output with order number and flight info.
  useEffect(() => {
    if (flightOrderData.length === 0 && orders && flights) {
      const objOrders = orders.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];

        acc[key] = curr[key];

        return acc;
      }, {});

      const flightsWithOrders = { ...flights };

      for (const flight in flightsWithOrders) {
        for (const arrival of destinations) {
          const findFlight: FlightData = flightsWithOrders[flight].find(
            (flight) => {
              return flight.arrival_city === arrival;
            }
          );

          findFlight.orders = objOrders[arrival].splice(0, 20);
        }
      }

      setFlightOrderData(flightsWithOrders);
    }
  }, [orders, flights, flightOrderData, setFlightOrderData]);

  useEffect(() => {
    if (flightOrderData && !isOrdersLoading && !isFlightsLoading) {
      const combined = Object.keys(flightOrderData).reduce((acc, curr) => {
        acc.push(...flightOrderData[curr]);

        return acc;
      }, []);

      setCombinedOrders(combined);
    }
  }, [isFlightsLoading, isOrdersLoading, flightOrderData]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Flight</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {combinedOrders.map((flight) => {
            const { day, flight_number, departure_city, arrival_city, orders } =
              flight;

            return orders.map((order, key) => {
              const { id } = order;

              return (
                <tr key={key}>
                  <td>{id}</td>
                  <td>{flight_number}</td>
                  <td>{departure_city}</td>
                  <td>{arrival_city}</td>
                  <td>{day}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
