//function to translate the address category
export const addressCategoryTranslate = (category: string): string => {
    switch (category) {
        case 'DELIVERY':
            return 'ENTREGA';
        case 'BILLING':
            return 'COBRANÇA';
        default:
            return '';
    }
}
