import * as React from 'react';
import { Accordion } from "react-bootstrap";
import CoinApi from '../../services/CoinApi';
import Investiment from '../Investment';
import './index.css'

function InvestmentList() {

    return (
        <section id="container-investment-list">

            <div id="investment-list"> 
                <Accordion flush>
                    {CoinApi.getAllCoins().map(coin => {
                        return <Investiment {...coin}/>
                    })}
                </Accordion>
            </div>


        </section>
    );
}

export default InvestmentList