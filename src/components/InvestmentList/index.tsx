import * as React from 'react';
import { Accordion } from "react-bootstrap";
import Investiment from '../Investment';
import './index.css'

function InvestmentList() {

    return (
        <section id="container-investment-list">

            <div id="investment-list"> 
                <Accordion flush>
                    <Investiment />
                </Accordion>
            </div>


        </section>
    );
}

export default InvestmentList