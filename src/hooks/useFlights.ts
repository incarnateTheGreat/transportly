// import { RushingData } from "interfaces/interface";
// import { FlightData } from "interfaces/interface";
import { useQuery } from "react-query";
import { SERVER_URL } from "utils/constants";
import { groupBy } from "utils/utils";

const useFlights = (repoName) => {
  return useQuery(
    [repoName],
    () => {
      let url = `${SERVER_URL}/flights`;

      // Return the Flights data, separated by day.
      return fetch(url).then(async (response) => {
        const data = await response.json();

        const flightsByDay = groupBy(data, "day");

        return flightsByDay;
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useFlights;
