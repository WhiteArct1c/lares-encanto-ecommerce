import { Pageable } from "./Pageable"

export type GridUserModel = {
   content:[];
   pageable: Pageable;
   last: boolean;
   totalElements: number;
   totalPages: number;
   size: number;
   number: number;
   sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
   };
   numberOfElements: number;
   first: boolean;
   empty: boolean;
}