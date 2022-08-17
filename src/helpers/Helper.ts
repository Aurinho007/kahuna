export function dateToTextBR(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function dateToTextFR(date: Date): string {
    return new Intl.DateTimeFormat('fr-CA').format(date);
}

export function textToDate(text: string): Date {
    return new Date(text.replaceAll('-', ','));
}

export function dateToLiteralDate(date: Date): string {
    let formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(date).split(', ')[1].split(' ');
    formattedDate.pop();
    return formattedDate.join(' ');
}

export function formatPrice(price: string): number {
    return parseFloat(price.replaceAll('.', '').replace(',', '.'));
}

export function formatBRLCurrency(number: number | undefined): string {
    if (number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
    }
    return '';
}

export function formatUSDCurrency(number: number | undefined): string {
    if (number) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    }
    return '';
}

export function moneyStringToFloat(value: string) : number {
    let formattedValue = parseFloat(value.replaceAll(".","").replace(",","."))
    return formattedValue
}
