import React, { useContext, useEffect, useState } from 'react';
import { NotifyContext } from '../../contexts/NotifyContext';
import Investiment from '../../types/Investiment';

interface BodyProps {
    inv: Investiment
    key: number
}

function BodyNotifyModal({ inv }: BodyProps) {
    const context = useContext(NotifyContext);
    const [ticker, setTicker] = useState<string>("");
    const [gainsPercent, setGainsPercent] = useState<number>();


    async function loadCoinsInfo(){
        let data;

        if(context.loadData){
            data = await context.loadData(inv.ticker)
            let total = (inv.amount / inv.purchasePrice) * data?.currentPriceBRL

            let gains = Math.abs( 1 - (inv.amount/total))*100
            
            setTicker(data.ticker);
            setGainsPercent(gains);
        }
    }

    useEffect(() => {
        loadCoinsInfo();
    }, [])
    
    return <>
        {
            gainsPercent && gainsPercent > 10 && <tr>
                <td>
                    { ticker }
                </td>
                <td>
                    { gainsPercent?.toFixed(2) }%
                </td>
            </tr>
        }
    </>
}

export default  BodyNotifyModal;