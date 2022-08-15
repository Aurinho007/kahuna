import CoinsJSON from '../Coins.json';
import CoinInterface from '../types/CoinInterface';
import TickerData from '../types/TickerData';
import Summary from '../types/Summary';
import CoinInfo from '../types/CoinInfo';

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

    static async getCoinLastInfo(ticker: string): Promise<TickerData> {
        ticker = ticker.toUpperCase();

        return await fetch(`https://www.mercadobitcoin.net/api/${ticker}/ticker/`)
        .then(res => res.json())
        .then(data => data.ticker)
        .then((data: TickerData) => data);
    }

    static async getCoinLastDaySummary(ticker: string): Promise<Summary> {
        const yesterday = this.getYesterdayDate();
        ticker = ticker.toUpperCase();

        return await fetch(`
            https://www.mercadobitcoin.net/api/${ticker}/day-summary/${yesterday.getFullYear()}/${yesterday.getMonth() + 1}/${yesterday.getDate()}/
        `)
        .then(res => res.json())
        .then((data: Summary) => data);
    }

    static getCoinPrice(lastInfo: TickerData): number {
        let formattedPrice = parseFloat(lastInfo.last).toFixed(2);

        return parseFloat(formattedPrice);
    }

    
    static getCoinVolume(lastInfo: TickerData): number {
        return parseFloat(lastInfo.last) * parseFloat(lastInfo.vol);
    }
    
    static getCoinHighestPrice(lastInfo: TickerData): number {
        return parseFloat(lastInfo.high);
    }
    
    static getYesterdayDate(): Date {
        let date = new Date();
        
        date.setDate(date.getDate() - 1);

        return date;
    }

    static async getCoinPriceUSD(lastInfo: TickerData): Promise<number> {
        return await fetch(`https://www.mercadobitcoin.net/api/USDC/ticker/`)
        .then(res => res.json())
        .then(data => data.ticker)
        .then((dolar: TickerData) => {
            const priceUSD: number = parseFloat(dolar.buy);

            let coinPriceUSD = (parseFloat(lastInfo.last) / priceUSD).toFixed(2);
            return parseFloat(coinPriceUSD);
        }); 
    }

    static async getCoinGrowth(lastInfo: TickerData, lastDaySum: Summary): Promise<number> {
        const currentPrice: number = parseFloat(lastInfo.last);
        let growth = ((currentPrice - lastDaySum.avg_price) / lastDaySum.avg_price) * 100;
            
        return parseFloat(growth.toFixed(2));
    }

    static async getCoinInfo(ticker: string): Promise<CoinInfo> {
        const coinLastInfo = await this.getCoinLastInfo(ticker);
        const coinLastDaySummary = await this.getCoinLastDaySummary(ticker);

        const coinInfo: CoinInfo = {
            ticker: ticker,
            name: this.getCoinNameByTicker(ticker),
            currentPriceBRL: parseFloat(coinLastInfo.last),
            currentPriceUSD: await this.getCoinPriceUSD(coinLastInfo),
            growth: await this.getCoinGrowth(coinLastInfo, coinLastDaySummary),
            volume: this.getCoinVolume(coinLastInfo),
            highestPrice: this.getCoinHighestPrice(coinLastInfo)
        }

        return coinInfo;
    }
}

export default CoinApi;