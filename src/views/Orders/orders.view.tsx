import { TransportlyContext } from "interfaces/interface";
import { useEffect, useContext } from "react";
import { DESTINATIONS } from "utils/constants";
import { getCombinedFlightData } from "utils/utils";

const Orders = ({ history }) => {
  const { combinedFlightOrderData, setCombinedFlightOrderData } =
    useContext(TransportlyContext);

  // If there's no combined data available, then fetch it.
  useEffect(() => {
    if (!combinedFlightOrderData) {
      const getData = async () => {
        const res = await getCombinedFlightData(DESTINATIONS);

        setCombinedFlightOrderData(res);
      };

      getData();
    }
  }, [combinedFlightOrderData, setCombinedFlightOrderData]);

  return (
    <div className="orders">
      <button
        className="border primary viewFlightSchedule"
        type="button"
        title="VIEW FLIGHT SCHEDULE"
        onClick={() => history.push("/flights")}
      >
        VIEW FLIGHT SCHEDULE
      </button>
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
          {combinedFlightOrderData?.map((flight) => {
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
