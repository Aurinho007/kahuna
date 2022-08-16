import * as React from 'react';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import InvestmentList from '../../components/InvestimentList';
import ModalNotify from '../../components/ModalNotify';

function Manager() {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 4000)
    }, [])

    return <>
        <Header/>
        <InvestmentList/>
        <ModalNotify/>
    </>;
}

export default Manager;