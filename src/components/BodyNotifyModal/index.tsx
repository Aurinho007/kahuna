import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { NotifyContext } from '../../contexts/NotifyContext';
import Controller from '../../controllers/Controller';
import Investiment from '../../types/Investiment';

interface Greater {
    id: number
    ticker: string
    gain: number
}

function BodyNotifyModal() {
    const context = useContext(NotifyContext);
    const [ticker, setTicker] = useState<string>("");
    const [gainsPercent, setGainsPercent] = useState<number>();
    const investiments: Array<Investiment> = Controller.getAllInvestiments();

    const [greaters, setGreaters] = useState<Greater[]>([])


    async function loadCoinsInfo(inv: Investiment){
        let data;
        if(context.loadData){
            data = await context.loadData(inv.ticker)
            let total = (inv.amount / inv.purchasePrice) * data?.currentPriceBRL

            let gains = Math.abs( 1 - (inv.amount/total))*100
            
            if(gains > 10) {
                setTicker(data.ticker);
                setGainsPercent(gains);
                setGreaters([...greaters, {id: inv.id, ticker: data.ticker, gain: gains}])
                context.setShowNotify ? context.setShowNotify(true) : '';
            }
        }
    }

    useEffect(() => {
        investiments.map((inv) => {
            loadCoinsInfo(inv);
        })
    }, [])

    return <>
            {
                greaters.length !== 0 ?
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

                                     return (<tr key={greater.id}>
                                        <td>
                                            { ticker }
                                        </td>
                                        <td>
                                            { gainsPercent?.toFixed(2) }%
                                        </td>
                                    </tr>);
                                })
                            }
                        </tbody>
                    </Table>
                </>
                :
                <div className="title-container">
                    <p className='modal-notify-title'>Ainda não existem moedas que renderam mais 10% 😢</p>
                </div>
                
            }
    </>
}

export default  BodyNotifyModal;