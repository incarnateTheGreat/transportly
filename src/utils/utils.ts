import { FlightData } from "interfaces/interface";
import { SERVER_URL } from "./constants";

// Group results by a specified field.
export const groupBy = (arr, property) => {
  return arr.reduce((acc, curr) => {
    acc[curr[property]] = [...(acc[curr[property]] || []), curr];
    return acc;
  }, {});
};

// Create URL Params.
export const encodeQueryData = (objectToParse) => {
  const params = [];

  for (let param in objectToParse) {
    params.push(
      `${encodeURIComponent(param)}=${encodeURIComponent(objectToParse[param])}`
    );
  }

  return params.join("&");
};

export const assignActivePageClass = (current, page) =>
  current === page ? "active" : "";

// Assign classes and sort direction arrows.
export const assignSelectedColumnClass = (col, selectedSortColumn) =>
  selectedSortColumn === col ? "selectedColumn" : "";

// Return flights in an object based on day numbers.
export const getFlightsBasedOnDays = (arr) =>
  arr.reduce((acc, curr) => {
    if (!acc[curr.day]) {
      acc[curr.day] = [curr];
    } else {
      acc[curr.day].push(curr);
    }

    return acc;
  }, {});

// Service that gets all flight data and returns grouped them by day.
export const getFlights = () => {
  let url = `${SERVER_URL}/flights`;

  // Return the Flights data, separated by day.
  return fetch(url).then(async (response) => {
    const data = await response.json();

    const flightsByDay = groupBy(data, "day");

    return flightsByDay;
  });
};

// Service that returns all order data.
export const getAllOrders = (destinations) => {
  return destinations.map((destination) => {
    return new Promise(async (resolve, reject) => {
      let ordersUrl = `${SERVER_URL}/orders?destination=${destination}`;

      const ordersRes = await fetch(ordersUrl).then((response) =>
        response.json()
      );

      if (ordersRes) {
        resolve({ [destination]: ordersRes });
      } else {
        reject("Error.");
      }
    }).catch(() => {
      console.log("Error.");
    });
  });
};

// Get the Order and Flight data, then combine the Order data with the Flights to meet the requirements
// of the correct number of orders per flight.
export const getCombinedFlightData = async (destinations) => {
  const orders = await Promise.all(getAllOrders(destinations));
  const flights = await getFlights();
  let flightsWithOrders;

  if (orders && flights) {
    const objOrders = orders.reduce((acc, curr) => {
      const key = Object.keys(curr)[0];

      acc[key] = curr[key];

      return acc;
    }, {});

    flightsWithOrders = { ...flights };

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

    if (flightsWithOrders) {
      flightsWithOrders = Object.keys(flightsWithOrders).reduce((acc, curr) => {
        acc.push(...flightsWithOrders[curr]);

        return acc;
      }, []);
    }
  }

  return flightsWithOrders;
};
