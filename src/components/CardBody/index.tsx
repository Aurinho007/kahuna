import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Controller from '../../controllers/Controller';
import { dateToTextBR, formatBRLCurrency } from '../../helpers/Helper';
import CoinApi from '../../services/CoinApi';
import CoinInfo from '../../types/CoinInfo';
import Investiment from '../../types/Investiment';
import ModalAddInvest from '../ModalAddInvest';
import './index.css'

interface CardBodyProps {
	props: Investiment,
	setUpdateView: Dispatch<SetStateAction<number | undefined>>
}

function CardBody(params: CardBodyProps) {
    const [api, setApi] = useState<CoinInfo>();
    const [total, setTotal] = useState<number>();
    const [showModalAddInvest, setShowModalAddInvest] = useState<boolean>(false);

    async function loadApi() {
        const data = await CoinApi.getCoinInfo(params.props.ticker);
        setApi(data);

        setTotal((params.props.amount / params.props.purchasePrice) * data?.currentPriceBRL);
    }

    useEffect(() => {
        loadApi()
    }, [])

    function removeInvestiment() : void {
        Controller.removeInvestiment(params.props);
        params.setUpdateView(params.props.id)
    }

    return ( 
        <section className="container">
        <ModalAddInvest 
            headerTitle={'Editar investimento'}
            mainButtonText={'Salvar'}
            showModalAddInvest={showModalAddInvest}
            setShowModalAddInvest={setShowModalAddInvest}
            invest={params.props}
            isAddInvest={false}
        />

        <div className="container-card-body">
            <div className="user-purchase">
                <span className="user-purchase-title">
                    Sua Compra
                </span>

                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Data da compra
                    </span>
                    <span className="user-purchase-value">
                        { dateToTextBR(params.props.purchaseDate) }
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valor de { params.props.ticker } na data da compra
                    </span>
                    <span className="user-purchase-value">
                        { formatBRLCurrency(params.props.purchasePrice) }
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Quantidade de { params.props.ticker } comprados
                    </span>
                    <span className="user-purchase-value">
                        { parseFloat((params.props.amount / params.props.purchasePrice).toFixed(4)) }
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valor da compra
                    </span>
                    <span className="user-purchase-value important-value">
                        { formatBRLCurrency(params.props.amount) }
                    </span>
                </div>
            </div>
            <div className="user-purchase">
                <span className="user-purchase-title">
                    Atualmente
                </span>

                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Data
                    </span>
                    <span className="user-purchase-value">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valor atual de { params.props.ticker }
                    </span>
                    <span className="user-purchase-value">
                        { api?.currentPriceBRL ? formatBRLCurrency(api?.currentPriceBRL) : '' }
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valorização em 24h
                    </span>
                    <span className={`user-purchase-value ${api?.growth && api?.growth > 0 ? 'colored-gain' : 'colored-lost'}`}>
                        {api?.growth && api?.growth > 0 ? '+' : '' } {api?.growth.toFixed(2)}%
                    </span>
                </div>
            </div>
            <div className="user-purchase">
                <span className="user-purchase-title">
                    Rendimento
                </span>

                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Total
                    </span>
                    <span className={`user-purchase-value important-value ${total && total < params.props.amount ? 'colored-lost' : 'colored-gain'}`}>
                        { total ? formatBRLCurrency(total) : ''}
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-gains">
                        Até o momento você teve <span className='bolded'>{total ? formatBRLCurrency(Math.abs(total - params.props.amount)) : ''}</span> de 
                        <span className={`${total && total < params.props.amount ? 'colored-lost' : 'colored-gain'}`}>
                            {total && total < params.props.amount ? ' PREJUÍZO' : ' LUCRO'}
                        </span>
                    </span>
                </div>
            </div>
        </div>

        <div className='user-actions'>
            <button className='action' onClick={() => setShowModalAddInvest(!showModalAddInvest)}>Editar</button>
            <button className='action' onClick={() => confirm("Tem certeza que deseja apagar este investimento?")  ? removeInvestiment() : 0 }>Apagar</button>
        </div>
        </section>
    );
}

export default CardBody;