export type Pageable = {
   pageNumber: number,
   pageSize: number,
   sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
   },
   offset: number,
   paged: boolean,
   unpaged: boolean
}