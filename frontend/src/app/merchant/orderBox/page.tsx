"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Item } from "@/lib/types/db";
import OrderDetails from "@/components/OrderDetail";
import { orderData } from "../../dbTemplate/cardData";
import { DataTableDemo } from "@/components/allOrderTable";
import { useCookies } from "react-cookie";
import { getAllOrders } from "./_components/actions";
import { useEffect, useState } from "react";
type Order = {
  customerId: number;
  id: number;
  orderItems: any[]; // Replace 'any' with a more specific type if possible
  payment: number;
  pickupTime: string;
  status: string;
  storeId: number;
  time: string;
};
// Define the props for TabsDemo component
const OrderBox = () => {
  const defaultValue = "All_Orders";
  const [cookies, setCookie] = useCookies(['refreshToken', 'accessToken', '__session']);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { __session: accessToken = '' } = cookies;
  console.log(accessToken);
  useEffect(() => {
    getAllOrders(accessToken)
      .then(data => {
        setOrders(data); // Assuming 'data' is the array of orders
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setError(err);
        setLoading(false);
      });
  }, [accessToken]); // Dependency array
  return (
    <Tabs className="w-full" defaultValue={defaultValue}>
      <TabsList className="grid w-full grid-cols-6 mt-6">
        <TabsTrigger value="Today">Today</TabsTrigger>
        <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="All_Orders">All Orders</TabsTrigger>
        <div className="col-span-7"></div>
      </TabsList>
      <TabsContent value="Today">
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-4 w-[90%] px-5 mt-6">
            {orders && orders.map((order, index) => (
              <div key={index} className="flex-none min-w-[150px]">
                <OrderDetails
                  pickUpTime={order.pickupTime}
                  orderNumber={order.id}
                  orderTime={order.time}
                  items={order.orderItems}
                  status={order.status}
                />
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="Upcoming">
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-4 w-[90%] px-5 mt-6">
            {orderData.map((order, index) => (
              <div key={index} className="flex-none min-w-[150px]">
                <OrderDetails
                  pickUpTime={order.pickUpTime}
                  orderNumber={order.orderNumber}
                  orderTime={order.orderTime}
                  items={order.items}
                  status={order.status}
                />
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="All_Orders">
        <DataTableDemo />
      </TabsContent>
    </Tabs>
  );
};

export default OrderBox;
