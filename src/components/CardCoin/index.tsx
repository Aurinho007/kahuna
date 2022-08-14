import * as React from 'react';
import { useEffect, useState } from 'react';
import { formatBRLCurrency, formatUSDCurrency } from '../../helpers/DateHelper';
import CoinApi from '../../services/CoinApi';
import './index.css';

interface CardCoinProps {
    ticker: string
    image: string
}

function CardCoin(props: CardCoinProps) {
    const [ticker] = useState<string>(props.ticker);
    const [name] = useState<string>(CoinApi.getCoinNameByTicker(ticker));
    const [currentPriceBRL, setCurrentPriceBRL] = useState<number>();
    const [currentPriceUSD, setCurrentPriceUSD] = useState<number>();
    const [growth, setGrowth] = useState<number>();
    const [volume, setVolume] = useState<number>();
    const [highest, setHighest] = useState<number>();

    async function loadPrices() {
        const priceBRL = await CoinApi.getCoinPrice(ticker);
        const priceUSD = await CoinApi.getCoinPriceUSD(ticker);
        const growthValue = await CoinApi.getCoinGrowth(ticker);
        const coinVolume = await CoinApi.getCoinVolume(ticker);
        const highestValue = await CoinApi.getHighestPriceCoin(ticker);

        setCurrentPriceBRL(priceBRL);
        setCurrentPriceUSD(priceUSD);
        setGrowth(growthValue);
        setVolume(coinVolume);
        setHighest(highestValue);
    }

    useEffect(() => {
        loadPrices();
    }, []);
    
    return <>
        <div className="coin">
            <div className="coin-header">
                <div className="coin-header-left">
                    <img src={props.image} />
                    <div className="coin-labels">
                        <span className="coin-label-first">{name}</span>
                        <span className="coin-label-second">{ticker}</span>
                    </div>
                </div>
                <div className="coin-header-right">
                    <div className="coin-labels">
                        <span className="coin-label-first">{formatBRLCurrency(currentPriceBRL)}</span>
                        <span className="coin-label-second">{formatUSDCurrency(currentPriceUSD)}</span>
                    </div>
                </div>
            </div>
            <div className="coin-body">
                <div className="coin-body-group">
                    <div className="coin-label-second">Volume em 24h</div>
                    <div className="coin-label-first">{formatBRLCurrency(volume)}</div>
                </div>
                <div className="coin-body-group">
                    <div className="coin-label-second">Maior preço</div>
                    <div className="coin-label-first">{formatBRLCurrency(highest)}</div>
                </div>
                <div className="coin-body-group">
                    <div className="coin-label-second">Variação em 24h</div>
                    <div 
                        className={`coin-label-first coin-growth ${growth && growth > 0 ? 'positive': 'negative'}`}
                    >{growth && growth > 0 ? '+': ''}{growth}%</div>
                </div>
            </div>
        </div>
    </>;
}

export default CardCoin;