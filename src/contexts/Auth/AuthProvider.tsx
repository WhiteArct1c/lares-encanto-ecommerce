import {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {useApi} from "../../hooks/useApi";
import {ResponseCustomer} from "../../utils/types/ResponseCustomer";
import {Customer} from "../../utils/types/Customer";
import {Address} from "../../utils/types/Address";
import {IUpdatePasswordRequest} from "../../utils/interfaces/request/IUpdatePasswordRequest";
import {IAddCustomerAddressRequest} from "../../utils/interfaces/request/IAddCustomerAddressRequest";
import {IUpdateCustomer} from "../../utils/interfaces/request/IUpdateCustomer";
import {IUpdateAddressRequest} from "../../utils/interfaces/request/IUpdateAddressRequest.ts";
import {CreditCardRequest} from "../../utils/types/request/customer-credit-card/CreditCardRequest.ts";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

   const [user, setUser] = useState<ResponseCustomer | null>(null);
   const api = useApi();

   useEffect(() => {
      const validateToken = async () => {
         const storageData = localStorage.getItem('authToken');
         if (storageData) {
            const data = await api.validateToken(storageData);
            if (data.data[0]) {
               setUser(data.data[0]);
            }
         }
      }
      validateToken();
   }, []);

   const signin = async (email: string, password: string) => {
      const data = await api.signin(email, password);

      if (data.code == "200 OK") {
         const userData = await api.validateToken(data.data[0].token);
         setUser(userData.data[0]);
         setToken(data.data[0].token);
      }

      return data;
   }

   const verifyRole = async () => {
      const token = localStorage.getItem('authToken');
      if(token){
         return await api.verifyRole(token);
      }
   }

   const signout = async () => {
      await api.logout();
      setUser(null);
      setToken('');
   }

   const registerCustomer = async (user: Customer) => {
      const response = await api.registerCustomer(user);
      return response;
   }

   const deactivateAccount = async (token: string) => {
      const response = await api.deactivateAccount(token);
      return response;
   }

   const updatePassword = async (passwordUpdateRequest: IUpdatePasswordRequest) => {
      const response = await api.updatePassword(passwordUpdateRequest);
      return response;
   }

   const updateCustomer = async (customer: IUpdateCustomer) => {
      const response = await api.updateCustomer(customer);
      return response;
   }

   const registerCustomerAddress = async (address: IAddCustomerAddressRequest) => {
      const response = await api.registerCustomerAddress(address);
      return response;
   }
   const updateCustomerAddress = async(address: IUpdateAddressRequest) => {
      return await api.updateCustomerAddress(address);
   }

   const deleteCustomerAddress = async (address: Address) => {
      const response = await api.deleteCustomerAddress(address);
      return response;
   }

   const createCreditCard = async (createCreditCardRequest: CreditCardRequest) => {
      return await api.createCreditCard(createCreditCardRequest);
   }

   const listCreditCards = async () =>{
      const token: string | null = localStorage.getItem('authToken');
      return await api.listCreditCards(token)
   }

   const setToken = (token: string) => {
      localStorage.setItem('authToken', token);
   }

   return (
      <AuthContext.Provider value={{ 
         user, 
         signin, 
         signout,
         verifyRole,
         registerCustomer, 
         deactivateAccount, 
         deleteCustomerAddress, 
         updatePassword, 
         registerCustomerAddress,
         updateCustomerAddress,
         updateCustomer,
         createCreditCard,
         listCreditCards
      }}>
         {children}
      </AuthContext.Provider>
   )
}