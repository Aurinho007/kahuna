import * as React from 'react';
import { useState, useEffect } from 'react';
import { Accordion } from "react-bootstrap";
import { BsFilter } from 'react-icons/bs'
import Controller from '../../controllers/Controller';
import Investiment from '../../types/Investiment';
import InvestimentItem from '../InvestimentItem';
import KButton from '../KButton';
import ModalAddInvest from '../ModalAddInvest';
import './index.css'

function InvestmentList() {
    const [showModalAddInvest, setShowModalAddInvest] = useState<boolean>(false);

    return (
        <section id="container-investment-list">
            <div className="investiments-header">
                <h1>Seus investimentos</h1>
                <div className="investiments-header-inputs">
                    <BsFilter id="btn-filter"/>
                    <KButton 
                        id="btn-add-investiment" 
                        text="Adicionar investimento" 
                        onClick={() => setShowModalAddInvest(!showModalAddInvest)}
                    />
                </div>
            </div>

            <ModalAddInvest 
                {...{
                        headerTitle: 'Adicione um novo investimento',
                        mainButtonText: 'Adicionar',
                        showModalAddInvest, setShowModalAddInvest
                    }
                }
            />
            <div id="investment-list"> 
                <Accordion flush>
                    {Controller.getAllInvestiments().map(inv => {
                        return <InvestimentItem key={inv.id} {...inv}/>
                    })}
                </Accordion>
            </div>
        </section>
    );
}

export default InvestmentList;
