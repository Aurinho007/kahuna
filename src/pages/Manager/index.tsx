import * as React from 'react';
import Header from '../../components/Header';
import InvestmentList from '../../components/InvestimentList';
import ModalNotify from '../../components/ModalNotify';

function Manager() {
    return <>
        <Header/>
        <InvestmentList/>
        {/* <ModalNotify/> */}
    </>;
}

export default Manager;