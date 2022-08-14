import CoinsJSON from '../Coins.json';
import CoinInterface from '../types/CoinInterface';

interface TickerData {
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

    static getCoinNameByTicker(ticker: string): string {
        ticker.toUpperCase();
        const coins = this.getAllCoins();
        const coin = coins.filter(coin => coin.ticker === ticker);
        
        return coin[0].name;
    }

    static async getCoinPrice(ticker: string): Promise<number> {
        ticker = ticker.toUpperCase();

        return await fetch(`https://www.mercadobitcoin.net/api/${ticker}/ticker/`)
        .then(res => res.json())
        .then(data => data.ticker)
        .then((tickerData: TickerData) => {
            let formattedPrice = parseFloat(tickerData.last).toFixed(2);
            return parseFloat(formattedPrice);
        });
    }

    static async getCoinLastInfo(ticker: string): Promise<TickerData> {
        ticker = ticker.toUpperCase();

        return await fetch(`https://www.mercadobitcoin.net/api/${ticker}/ticker/`)
        .then(res => res.json())
        .then(data => data.ticker)
        .then((tickerData: TickerData) => {
            return tickerData;
        });
    }

    static async getCoinVolume(ticker: string): Promise<number> {
        ticker = ticker.toUpperCase();

        const coinInfo = await this.getCoinLastInfo(ticker);
        return parseFloat(coinInfo.last) * parseFloat(coinInfo.vol);
    }

    static async getHighestPriceCoin(ticker: string): Promise<number> {
        ticker = ticker.toUpperCase();

        const coinInfo = await this.getCoinLastInfo(ticker);
        return parseFloat(coinInfo.high);
    }

    static async getCoinPriceUSD(ticker: string): Promise<number> {
        ticker = ticker.toUpperCase();
        const priceBRL = await this.getCoinPrice(ticker);

        return await fetch(`https://www.mercadobitcoin.net/api/USDC/ticker/`)
        .then(res => res.json())
        .then(data => data.ticker)
        .then((tickerData: TickerData) => {
            const priceUSD = parseFloat(tickerData.buy);

            let formattedPrice = (priceBRL / priceUSD).toFixed(2);
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
            
            return parseFloat(growth.toFixed(2));
        });
    }
}

export default CoinApi;