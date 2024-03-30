import { createContext } from 'react';
import { ResponseCustomer } from '../../utils/types/ResponseCustomer';
import { Customer } from '../../utils/types/Customer';
import { Address } from '../../utils/types/Address';
import { IUpdatePasswordRequest } from '../../utils/interfaces/request/IUpdatePasswordRequest';
import { IAddCustomerAddressRequest } from '../../utils/interfaces/request/IAddCustomerAddressRequest';
import { IUpdateCustomer } from '../../utils/interfaces/request/IUpdateCustomer';
import {IUpdateAddressRequest} from "../../utils/interfaces/request/IUpdateAddressRequest.ts";
import {ResponseAPI} from "../../utils/types/response/ResponseAPI.ts";
import {CreditCardRequest} from "../../utils/types/request/customer-credit-card/CreditCardRequest.ts";

export type AuthContextType = {
   user: ResponseCustomer | null;
   signin: (email: string, password: string) => Promise<ResponseAPI>;
   signout: () => void;
   verifyRole: () => Promise<ResponseAPI>;
   registerCustomer: (user: Customer) => Promise<undefined>;
   deactivateAccount: (token: string) => Promise<undefined>;
   updatePassword: (passwordUpdateRequest: IUpdatePasswordRequest) => Promise<undefined>;
   registerCustomerAddress: (address: IAddCustomerAddressRequest) => Promise<undefined>;
   updateCustomer: (customer: IUpdateCustomer) => Promise<undefined>;
   deleteCustomerAddress: (address: Address) => Promise<undefined>;
   updateCustomerAddress: (address: IUpdateAddressRequest) => Promise<undefined>;
   createCreditCard: (request: CreditCardRequest) => Promise<ResponseAPI>;
   listCreditCards:() => Promise<ResponseAPI>;
}


export const AuthContext = createContext<AuthContextType>(null!);
