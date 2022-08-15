import * as React from 'react';
import { useEffect, useState } from 'react';
import { dateToTextBR, formatBRLCurrency } from '../../helpers/DateHelper';
import CoinApi from '../../services/CoinApi';
import CoinInfo from '../../types/CoinInfo';
import Investiment from '../../types/Investiment';
import './index.css'

function CardBody(props: Investiment) {
    const [api, setApi] = useState<CoinInfo>()

    async function loadApi() {
        const data = await CoinApi.getCoinInfo(props.ticker);
        setApi(data);
    }

    useEffect(() => {
        loadApi()
    }, [])

    return ( 
        <section className="container">

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
                        { dateToTextBR(props.purchaseDate) }
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valor de { props.ticker } na data da compra
                    </span>
                    <span className="user-purchase-value">
                        { formatBRLCurrency(props.purchasePrice) }
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Quantidade de { props.ticker } comprados
                    </span>
                    <span className="user-purchase-value">
                        { (props.amount / props.purchasePrice).toFixed(2)}
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valor da compra
                    </span>
                    <span className="user-purchase-value important-value">
                        { formatBRLCurrency(props.amount) }
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
                        Valor atual de { props.ticker }
                    </span>
                    <span className="user-purchase-value">
                        { api?.currentPriceBRL.toFixed(2) }
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valorização
                    </span>
                    <span className={`user-purchase-value ${api?.growth && api?.growth > 0 ? 'colored-gain' : 'colored-lost'}`}>
                        {api?.growth && api?.growth > 0 ? '+' : '-' } {api?.growth.toFixed(2)}%
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
                    <span className="user-purchase-value important-value">
                        { api?.currentPriceBRL ? (props.purchasePrice * api?.currentPriceBRL).toFixed(2) : ''} //AQUI
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-gains">
                        Até o momento você teve R$ {'258,00'} de {'LUCRO'}
                    </span>
                </div>
            </div>
        </div>

        <div className='user-actions'>
            <button className='action'>Editar</button>
            <button className='action'>Apagar</button>
        </div>
            
        </section>
    );
}

export default CardBody;