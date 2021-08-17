import { useContext, useEffect, useState } from "react";
import { FlightData, TransportlyContext } from "interfaces/interface";
import { getCombinedFlightData } from "utils/utils";
import { DESTINATIONS } from "utils/constants";

const Flight = ({ location }) => {
  const { flight_number } = location.state;
  const { combinedFlightOrderData, setCombinedFlightOrderData } =
    useContext(TransportlyContext);
  const [selectedFlight, setSelectedFlight] = useState<FlightData>();

  // If there's no combined data available, then fetch it.
  useEffect(() => {
    if (!combinedFlightOrderData) {
      const getData = async () => {
        const res = await getCombinedFlightData(DESTINATIONS);

        setCombinedFlightOrderData(res);
      };

      getData();
    } else {
      const res = combinedFlightOrderData.find(
        (flight) => flight.flight_number === flight_number
      );

      setSelectedFlight(res);
    }
  }, [combinedFlightOrderData, setCombinedFlightOrderData, flight_number]);

  return (
    <div className="flight">
      {selectedFlight && (
        <>
          <h2>
            Flight {flight_number}: {selectedFlight.departure_city} &#10132;{" "}
            {selectedFlight.arrival_city}
          </h2>
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
              {selectedFlight?.orders.map((order, key) => {
                const { day, departure_city, arrival_city } = selectedFlight;
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
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Flight;
