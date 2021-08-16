// import { RushingData } from "interfaces/interface";
import { OrdersData } from "interfaces/interface";
import { useQuery } from "react-query";
import { SERVER_URL } from "utils/constants";

const useOrders = (repoName, destinations) => {
  const getFlights = () => {
    return destinations.map((destination) => {
      return new Promise(async (resolve, reject) => {
        let url = `${SERVER_URL}/orders?destination=${destination}`;

        const res = await fetch(url).then((response) => response.json());

        if (res) {
          resolve({ [destination]: res });
        } else {
          reject("Error.");
        }
      }).catch(() => {
        console.log("Error.");
      });
    });
  };

  // Create an outout merged with order number and flight info.

  return useQuery<OrdersData[]>(
    [repoName, destinations],
    () => {
      // Return the Orders data.
      return Promise.all(getFlights());
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useOrders;
