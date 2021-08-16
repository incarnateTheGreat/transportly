import useFlights from "hooks/useFlights";
import Spinner from "components/Spinner/spinner.component";

const Flights = () => {
  const repoName = "flightRepo";
  const { isLoading, data } = useFlights(repoName);

  // const viewFlight = (flight_number) => {};

  return (
    <div className="flights">
      {isLoading && <Spinner position="floatCenter" />}

      {!isLoading && Object.keys(data).length > 0 && (
        <>
          {Object.keys(data).map((day, tableKey) => {
            return (
              <table key={tableKey}>
                <thead>
                  <tr>
                    <th>Flight number</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {data[day].map((flight, key) => {
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
                            // onClick={() => viewFlight(flight_number)}
                          >
                            View flight
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Flights;
