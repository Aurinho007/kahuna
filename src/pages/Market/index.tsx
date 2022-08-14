import * as React from 'react';
import CardCoin from '../../components/CardCoin';
import Header from '../../components/Header';
import './index.css';

function Market() {
    return <>
        <Header/>
        <div className="coins-container">
            <CardCoin ticker='BTC' image='/images/btc.png'/>
            <CardCoin ticker='ETH' image='/images/eth.png'/>
            <CardCoin ticker='ADA' image='/images/ada.png'/>
            <CardCoin ticker='XRP' image='/images/xrp.png'/>
            <CardCoin ticker='SOL' image='/images/sol.png'/>
            <CardCoin ticker='MATIC' image='/images/matic.png'/>
            <CardCoin ticker='LTC' image='/images/ltc.png'/>
            <CardCoin ticker='DOT' image='/images/dot.png'/>
        </div>
    </>;
}

export default Market;