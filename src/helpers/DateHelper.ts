export function dateToTextBR(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(date);
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