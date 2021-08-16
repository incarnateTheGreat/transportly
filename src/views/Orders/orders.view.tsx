import useOrders from "hooks/useOrders";

const Orders = () => {
  const repoName = "ordersRepo";
  const { data } = useOrders(repoName, ["YYZ", "YVR", "YYC"]);

  console.log(data);

  return <div>Orders.</div>;
};

export default Orders;
