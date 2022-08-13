import * as React from "react";
import { Accordion } from "react-bootstrap";
import CoinApi from "../../services/CoinApi";
import Investiment from "../Investiment";
import "./index.css";

function InvestmentList() {
    return (
        <section id="container-investment-list">
            <div className="investiments-view">
                <h1>Seus investimentos</h1>
                <div id="investment-list">
                    <Accordion flush>
                        {CoinApi.getAllCoins().map((coin) => {
                            return <Investiment {...coin} purchaseData={new Date()} />;
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

export default InvestmentList;
