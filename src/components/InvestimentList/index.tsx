import * as React from 'react';
import { Accordion } from "react-bootstrap";
import CoinApi from '../../services/CoinApi';
import Investiment from '../Investiment';
import './index.css'

function InvestimentList() {

    return (
        <section id="container-investment-list">
            <div className="investiments-view">
                <div className="investiments-header">
                    <h1>Seus investimentos</h1>
                    
                </div>
                <div id="investment-list"> 
                    <Accordion flush>
                        
                    </Accordion>
                </div>
            </div>


        </section>
    );
}

export default InvestimentList