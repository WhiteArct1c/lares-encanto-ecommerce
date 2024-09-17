import { createContext, useState, ReactNode, useContext } from "react";
import { IOrder } from "../utils/interfaces/IOrder";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { IAddress } from "../utils/interfaces/IAddress";

interface OrderContextType {
   order: IOrder | undefined;
   shipmentPrice: number;
   shipmentAddress: IAddress | undefined;
   createOrder: (cartTotalPrice: number, shipmentAddress: IAddress) => void
   saveOrder: () => void
   updateOrderTotalPrice: (price: number) => void
   setOrderShipmentPrice: (shipmentPrice: number) => void
   setOrderShipmentAddress: (address: IAddress) => void
   saveShippingAddress: (status: boolean) => void
   resetOrder: () => void
}

interface OrderProviderProps {
   children: ReactNode;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: OrderProviderProps) => {
   const [order, setOrder] = useState<IOrder>();
   const [saveShipmentAddress, setSaveShipmentAddress] = useState(false);
   const [shipmentPrice, setShipmentPrice] = useState(0);
   const [shipmentAddress, setShipmentAddress] = useState<IAddress>();

   const cart = useContext(ShoppingCartContext);

   const createOrder = (cartTotalPrice: number) => {
      const newOrder: IOrder = {
         products: cart!.cartProducts,
         address: shipmentAddress,
         shippingPrice: shipmentPrice.toString(),
         totalPrice: cartTotalPrice.toString()
      }
      setOrder(newOrder);
   }

   //TODO: save order in database using the useApi hook
   const saveOrder = () => {
      if(saveShipmentAddress)
         console.log('Save shipment address');
   }

   const updateOrderTotalPrice = (price: number) => {
      order!.totalPrice += price;
   }

   const setOrderShipmentPrice = (shipmentPrice: number) => {
      setShipmentPrice(shipmentPrice);
   }

   const setOrderShipmentAddress = (shipmentAddress: IAddress) => {
      setShipmentAddress(shipmentAddress);
   }

   //TODO: use this on saveOrder to save the shipment address or not
   const saveShippingAddress = (status: boolean) => {
      setSaveShipmentAddress(!status);
   }

   const resetOrder = () => {
      setOrder(undefined);
      setShipmentPrice(0);
      setShipmentAddress(undefined);
   }

   return (
      <OrderContext.Provider value={
         {
            order,
            shipmentPrice,
            shipmentAddress, 
            createOrder,
            saveOrder,
            updateOrderTotalPrice, 
            setOrderShipmentPrice, 
            setOrderShipmentAddress,
            saveShippingAddress,
            resetOrder
         }
      }>
         {children}
      </OrderContext.Provider>
   );
}
