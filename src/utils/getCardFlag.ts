export const getCardFlag = (cardNumber: string): string => {
    // Remove espaços em branco e caracteres não numéricos do número do cartão
    cardNumber = cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    // Verifica os primeiros dígitos para determinar a bandeira
    if (/^4/.test(cardNumber)) {
        return 'Visa';
    } else if (/^5/.test(cardNumber)) {
        return 'Mastercard';
    } else if (/^3[47]/.test(cardNumber)) {
        return 'American Express';
    } else if (/^6/.test(cardNumber)) {
        return 'Discover';
    } else if (/^3(?:0[0-5]|[68])/.test(cardNumber)) {
        return 'Diners Club';
    } else if (/^35(?:2[89]|[3-8][0-9])/.test(cardNumber)) {
        return 'JCB';
    } else {
        return 'Bandeira inválida';
    }
};