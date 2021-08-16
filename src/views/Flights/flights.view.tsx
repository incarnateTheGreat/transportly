// import { withRouter } from "react-router-dom";
import useFlights from "hooks/useFlights";
import Spinner from "components/Spinner/spinner.component";
// import { handleNavClick } from "utils/utils";

const Flights = ({ history }) => {
  const repoName = "flightRepo";
  const { isLoading, data } = useFlights(repoName);

  // const viewFlight = (flight_number) => {};

  return (
    <div className="flights">
      {isLoading && <Spinner position="floatCenter" />}

      {!isLoading && Object.keys(data).length > 0 && (
        <div>
          <button
            className="border"
            type="button"
            title="VIEW ORDER SCHEDULE"
            onClick={() => {
              history.push("/orders");
            }}
          >
            VIEW ORDER SCHEDULE
          </button>
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
        </div>
      )}
    </div>
  );
};

// export default withRouter(Flights);
export default Flights;
