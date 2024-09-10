import axios from 'axios';
import { Customer } from '../utils/types/Customer';
import { Address } from '../utils/types/Address';
import { IUpdatePasswordRequest } from '../utils/interfaces/request/IUpdatePasswordRequest';
import { IAddCustomerAddressRequest } from '../utils/interfaces/request/IAddCustomerAddressRequest';
import { IUpdateCustomer } from '../utils/interfaces/request/IUpdateCustomer';
import { IUpdateAddressRequest } from "../utils/interfaces/request/IUpdateAddressRequest.ts";
import { CreditCardRequest } from "../utils/types/request/customer-credit-card/CreditCardRequest.ts";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL_DEV,
   headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json"
   }
});

const api_json = axios.create({
   baseURL: "http://localhost:3000",
   headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json"
   }
});

export const useApi = () => ({
   validateToken: async (token: string) => {
      const response = await api.post('/auth/validate', token);
      return response.data;
   },
   verifyRole: async (token: string) => {
      const response = await api.post('/auth/verify-role', token);
      return response.data;
   },
   signin: async (email: string, password: string) => {
      let res;

      await api.post('/auth/login', { email, password })
         .then(response => {
            res = response.data
         })
         .catch(e => {
            res = e.response.data
         });

      return res;
   },
   logout: async () => {
      // const response = await api.post('/logout');
      // return response.data;
   },
   deactivateAccount: async (token: string) =>{
      const response = await api.post('/auth/deactivate-account', token);
      return response.data;
   },
   updatePassword: async (updatePasswordRequest: IUpdatePasswordRequest) => {
      const response = await api.post('/user/update-password', updatePasswordRequest);
      return response.data;
   },
   registerCustomer: async (customer: Customer) => {
      let res;

      await api.post('/auth/register', customer)
      .then((response)=>{
         res = response.data
      })
      .catch(e => {
         res = e.response.data
      });

      return res;
   },
   updateCustomer: async (customer: IUpdateCustomer) => {
      const response = await api.put('/customers', customer, {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      })
      return response.data;
   },
   listAllCustomers: async (page: number = 0, size: number = 10) => {
      const response = await api.get(`/customers?page=${page}&size=${size}`, {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      });
      return response.data;
   },
   registerCustomerAddress: async (address: IAddCustomerAddressRequest) => {
      const response = await api.post('/address', address);
      return response.data;
   },
   updateCustomerAddress: async(address: IUpdateAddressRequest) => {
     const response = await api.put('/address', address);
     return response.data;
   },
   deleteCustomerAddress: async (address: Address) => {
      const response = await api.delete(`/address?id=${address.id}`, {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      });
      return response.data;
   },
   getProducts: async (categories?: string[]) => {
      const response = await api_json.get(categories?.length ? `/products?q=${categories.join(',')}` : '/products');
      return response.data;
   },
   getShippingTypes: async () => {
      const response = await api_json.get('/shippings');
      return response.data;
   },
   getPaymentTypes: async () => {
      const response = await api_json.get('/paymentMethods');
      return response.data;
   },
   getCreditCardById: async (id: number) => {
      const response = await api.get(`/credit-cards/${id}`, {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      });
      return response.data;
   },
   createCreditCard: async (createCreditCardRequest: CreditCardRequest) => {
      const response = await api.post(`/credit-cards`, createCreditCardRequest, {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      });
      return response.data;
   },
   updateCreditCard: async (updateCreditCardRequest: CreditCardRequest) => {
      const response = await api.put(`/credit-cards/${updateCreditCardRequest.id}`, updateCreditCardRequest, {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      });
      return response.data;
   },
   deleteCreditCard: async (id: number) => {
      const response = await api.delete(`/credit-cards/${id}`, {
         headers:{
             Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      });
      return response.data;
      },
   listCreditCards: async() => {
      const response = await api.get(`/credit-cards`, {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
         }
      });
      return response.data;
   }
})