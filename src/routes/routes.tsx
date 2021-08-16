import Flights from "views/Flights/flights.view";
import Flight from "views/Flight/flight.view";
import Orders from "views/Orders/orders.view";

const routes = [
  {
    label: "Flights",
    path: "/",
    component: Flights,
    exact: true,
  },
  {
    label: "Orders",
    path: "/orders",
    component: Orders,
    exact: true,
  },
  {
    label: "Selected flight",
    path: "/flight",
    component: Flight,
    exact: true,
  },
];

export default routes;
