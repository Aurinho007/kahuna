import * as React from 'react';
import { useEffect, useState } from 'react';
import CardCoin from '../../components/CardCoin';
import Header from '../../components/Header';
import './index.css';

function Market() {
    const [show, setShow] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setShow(false), 3500);
    }, [])

    return <>
        <Header/>
        <div className="coins-container">
            <div className={`loading-container  ${show ? 'show' : 'hide'}`}>
                <img className='loading' src="/animations/loading.gif" alt="Carregando moedas..." />
            </div>
            <div className={`coins ${show ? 'hide' : 'show'}`}>
                <CardCoin ticker='BTC' image='/images/btc.png'/>
                <CardCoin ticker='ETH' image='/images/eth.png'/>
                <CardCoin ticker='ADA' image='/images/ada.png'/>
                <CardCoin ticker='APE' image='/images/ape.png'/>
                <CardCoin ticker='USDC' image='/images/usdc.png'/>
                <CardCoin ticker='LINK' image='/images/link.png'/>
                <CardCoin ticker='XRP' image='/images/xrp.png'/>
                <CardCoin ticker='CHZ' image='/images/chz.png'/>
                <CardCoin ticker='DOGE' image='/images/doge.png'/>
                <CardCoin ticker='AXS' image='/images/axs.png'/>
                <CardCoin ticker='SOL' image='/images/sol.png'/>
                <CardCoin ticker='MATIC' image='/images/matic.png'/>
                <CardCoin ticker='LTC' image='/images/ltc.png'/>
                <CardCoin ticker='DOT' image='/images/dot.png'/>
            </div>
        </div>
    </>;
}

export default Market;