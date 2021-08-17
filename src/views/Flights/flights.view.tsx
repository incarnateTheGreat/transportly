import { useEffect, useContext, useState } from "react";
import Spinner from "components/Spinner/spinner.component";
import { TransportlyContext } from "interfaces/interface";
import { getCombinedFlightData, getFlightsBasedOnDays } from "utils/utils";
import { DESTINATIONS } from "utils/constants";

const Flights = ({ history }) => {
  const {
    isLoading,
    setIsLoading,
    combinedFlightOrderData,
    setCombinedFlightOrderData,
  } = useContext(TransportlyContext);
  const [flightsBasedOnDays, setFlightsBasedOnDays] = useState({});

  // If there's no combined data available, then fetch it.
  useEffect(() => {
    if (!combinedFlightOrderData) {
      setIsLoading(true);

      const getData = async () => {
        const res = await getCombinedFlightData(DESTINATIONS);

        setCombinedFlightOrderData(res);
        setIsLoading(false);
      };

      getData();
    }
  }, [
    isLoading,
    setIsLoading,
    combinedFlightOrderData,
    setCombinedFlightOrderData,
  ]);

  useEffect(() => {
    if (combinedFlightOrderData) {
      const res = getFlightsBasedOnDays(combinedFlightOrderData);

      setFlightsBasedOnDays(res);
    }
  }, [combinedFlightOrderData]);

  return (
    <div className="flights">
      {isLoading && <Spinner position="floatCenter" />}

      {!isLoading && Object.keys(flightsBasedOnDays).length > 0 && (
        <div>
          <button
            className="border primary viewOrderSchedule"
            type="button"
            title="VIEW ORDER SCHEDULE"
            onClick={() => history.push("/orders")}
          >
            VIEW ORDER SCHEDULE
          </button>
          {Object.keys(flightsBasedOnDays).map((day, tableKey) => {
            return (
              <>
                <h3>Scheduled flights for Day {day}</h3>
                <table key={tableKey}>
                  <thead>
                    <tr>
                      <th>Flight number</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                      <th>View Flight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flightsBasedOnDays[day].map((flight, key) => {
                      const { flight_number, departure_city, arrival_city } =
                        flight;

                      return (
                        <tr key={key}>
                          <td>{flight_number}</td>
                          <td>{departure_city}</td>
                          <td>{arrival_city}</td>
                          <td>
                            <button
                              type="button"
                              className="border"
                              onClick={() =>
                                history.push({
                                  pathname: "/flight",
                                  state: { flight_number },
                                })
                              }
                            >
                              View flight
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Flights;
