export type ResponseCustomer = {
   id: number,
   fullName: string,
   cpf: string,
   birthDate: string,
   phone: string,
   gender: {
      id: string,
      name: string
   }
   addresses: [{
      id: string,
      title: string,
      cep: string,
      residenceType: string,
      addressType: string,
      streetName: string,
      addressNumber: string,
      neighborhoods: string,
      state: string,
      city: string,
      country: string,
      observations: string
   }]
}