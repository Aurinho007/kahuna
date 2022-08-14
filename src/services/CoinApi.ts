import CoinsJSON from '../Coins.json';
import CoinInterface from '../types/CoinInterface';

interface Ticker {
    high: string
    low: string,
    vol: string,
    last: string,
    buy: string,
    sell: string,
    open: string,
    date: string
}

interface Summary {
    date: string
    opening: number
    closing: number
    lowest: number
    highest: number
    volume: string
    quantity: string
    amount: number
    avg_price: number
}

class CoinApi {

    static getAllCoins(): CoinInterface[] {
        return CoinsJSON.coins;
    }

    static async getCoinPrice(ticker: string): Promise<number> {
        ticker = ticker.toUpperCase();

        return await fetch(`https://www.mercadobitcoin.net/api/${ticker}/ticker/`)
        .then(res => res.json())
        .then(data => data.ticker)
        .then((tickerData: Ticker) => {
            let formattedPrice = parseFloat(tickerData.buy).toFixed(2);
            return parseFloat(formattedPrice);
        });
    }

    static async getCoinGrowth(ticker: string): Promise<number> {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        const yesterday = date.toLocaleDateString().split('/').reverse();

        return await fetch(`
            https://www.mercadobitcoin.net/api/${ticker}/day-summary/${yesterday[0]}/${yesterday[1]}/${yesterday[2]}/
        `)
        .then(res => res.json())
        .then(async (yesterdayData: Summary) => {
            const currentPrice = await this.getCoinPrice(ticker);
            let growth = ((currentPrice - yesterdayData.avg_price) / yesterdayData.avg_price) * 100;
            
            return growth;
        });
    }
}

export default CoinApi;