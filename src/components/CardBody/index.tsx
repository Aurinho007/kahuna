import * as React from 'react';
import './index.css'

function CardBody() {
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
                        {'08/85/2022'}
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valor de {'BTC'} na data da compra
                    </span>
                    <span className="user-purchase-value">
                        {'R$ 26.587,20'}
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Quantidade de {'BTC'} comprados
                    </span>
                    <span className="user-purchase-value">
                        {'0,0058'}
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valor da compra
                    </span>
                    <span className="user-purchase-value important-value">
                        {'R$ 456,00'}
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
                        Valor atual de {'BTC'}
                    </span>
                    <span className="user-purchase-value">
                        {'R$ 56.587,20'}
                    </span>
                </div>
                <div className="user-purchase-info">
                    <span className="user-purchase-label">
                        Valorização
                    </span>
                    <span className="user-purchase-value colored-gain">
                        {'+ 23%'}
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
                        {'R$ 765,00'}
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