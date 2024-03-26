export interface IUpdateAddressRequest{
    token: string,
    address:{
        id: string
        title: string
        cep: string
        residenceType: string
        addressType: string
        streetName: string
        addressNumber: string
        neighborhoods: string
        city: string
        state: string
        country: string
        observations: string
    }
}