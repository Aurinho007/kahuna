import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { NotifyContext } from '../../contexts/NotifyContext';
import Controller from '../../controllers/Controller';
import CoinInfo from '../../types/CoinInfo';
import Investiment from '../../types/Investiment';
import './index.css'

interface Greater {
    id: number
    ticker: string
    gain: number
}

function ModalNotify() {
    const context = useContext(NotifyContext);
    const investiments: Array<Investiment> = Controller.getAllInvestiments();
    const [showThis, setShowThis] = useState<boolean>(false);
    const [content, setContent] = useState<string>('none');
    const [greaters, setGreaters] = useState<Array<Greater>>([]);

    const handleClose = () => setShowThis(false);

    function loadCoinsInfo() {
        investiments.map(async (inv) => {
            let data: CoinInfo;
            if (context.loadData) {
                data = await context.loadData(inv.ticker)
                let total = (inv.amount / inv.purchasePrice) * data?.currentPriceBRL
                let gains = (1 - (inv.amount / total)) * 100

                if (gains > 10) {
                    setGreaters((greaters) => [...greaters, { id: inv.id, ticker: data.ticker, gain: gains }])
                    context.setShowNotify ? context.setShowNotify(true) : '';
                    setContent('show');
                }
                setShowThis(Controller.needToNotify());
            }
        });
    }
    
    useEffect(() => {
        loadCoinsInfo()
    }, []);

    return (
        <Modal show={showThis} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notificação de rendimento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-notify-container">
                    {
                        greaters.length !== 0 && content === 'show' ?
                        <>
                            <div className="title-container">
                                <p className='modal-notify-title'>As moedas abaixo renderam mais de 10%</p>
                            </div>

                            <Table className='modal-notify-table' striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>
                                            Moeda
                                        </th>
                                        <th>
                                            Rendimento
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        greaters?.map(greater => {
                                            return (
                                                <tr key={greater.id}>
                                                    <td>
                                                        {greater.ticker}
                                                    </td>
                                                    <td>
                                                        {greater.gain?.toFixed(2)}%
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </>
                        :
                        greaters.length === 0 && content === 'none' ?
                        <div className="title-container">
                            <p className='modal-notify-title'>Ainda não existem moedas que renderam mais 10% 😢</p>
                        </div>
                        : <></>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalNotify;