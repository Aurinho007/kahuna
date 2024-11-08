import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Accordion } from "react-bootstrap";
import Controller from '../../controllers/Controller';
import FilterButton from '../FilterButton';
import ImageDefaultInvestment from '../ImageDefaultInvestment';
import InvestimentItem from '../InvestimentItem';
import KButton from '../KButton';
import ModalAddInvest from '../ModalAddInvest';
import { UserContext } from '../../contexts/UserContext';
import './index.css'

function InvestmentList() {
    const [updateView, setUpdateView] = useState<number>();
    const [showModalAddInvest, setShowModalAddInvest] = useState<boolean>(false);
    const { investimentsToShow, setInvestimentsToShow } = useContext(UserContext);

    useEffect(() => {
        setInvestimentsToShow && setInvestimentsToShow(Controller.getAllInvestiments());
    }, [updateView])

    return (
        <section id="container-investment-list">
            <div className="investiments-header">
                <h1>Seus investimentos</h1>
                <div className="investiments-header-inputs">
                <FilterButton initialType="name"/>
                    <KButton 
                        id="btn-add-investiment" 
                        text="Adicionar investimento" 
                        onClick={() => setShowModalAddInvest(!showModalAddInvest)}
                    />
                </div>
            </div>
            <div id="image-default-investment">
                <ImageDefaultInvestment/>
            </div>

            <ModalAddInvest 
                headerTitle={'Adicione um novo investimento'}
                mainButtonText={'Adicionar'}
                showModalAddInvest={showModalAddInvest}
                setShowModalAddInvest={setShowModalAddInvest}
                isAddInvest={true}
            />

            <div id="investment-list"> 
                <Accordion flush>
                    {Controller.getAllInvestiments().map(inv => {
                        return <InvestimentItem key={inv.id} props={inv} setUpdateView={setUpdateView}/>
                    })}
                </Accordion>
            </div>
        </section>
    );
}

export default InvestmentList;