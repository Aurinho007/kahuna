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

export function maskPrice(number: string, setter: React.Dispatch<React.SetStateAction<string>>): void{

    const onlyDigits = number
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    setter(maskCurrency(digitsFloat))

}

export function maskCurrency(valor: string, locale = 'pt-BR', currency = 'BRL') {

    if(!valor)
        return ''

    let formatValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(parseFloat(valor))

    return formatValue.substring(3, formatValue.length)
}