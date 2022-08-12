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
}

export default CoinApi;