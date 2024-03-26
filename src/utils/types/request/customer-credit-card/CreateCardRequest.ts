export type CreateCardRequest = {
    token: string | null,
    cardNumber: number,
    cardName: string,
    cardCode: number,
    mainCard: boolean,
    cardFlag: string
}