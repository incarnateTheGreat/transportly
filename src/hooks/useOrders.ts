// import { RushingData } from "interfaces/interface";
import { OrdersData } from "interfaces/interface";
import { useQuery } from "react-query";
import { SERVER_URL } from "utils/constants";

const useOrders = (repoName, destinations) => {
  const getAllFlights = () => {
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

  return useQuery<OrdersData[]>(
    [repoName, destinations],
    () => {
      // Return the Orders data.
      return Promise.all(getAllFlights());
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useOrders;
