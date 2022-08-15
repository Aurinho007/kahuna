interface CoinInfo {
    ticker: string
    name: string,
    currentPriceBRL: number
    currentPriceUSD: number
    growth: number
    volume: number
    highestPrice: number
}

export default CoinInfo;