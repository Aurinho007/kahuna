import * as React from 'react';
import { createContext, useState } from "react";
import CoinApi from '../services/CoinApi';
import CoinInfo from '../types/CoinInfo';

interface NotifyContextProps {
    loadData?: (ticker: string) => Promise<CoinInfo>
    showNotify?: boolean
    setShowNotify?: (prop: boolean) => void
}

export const NotifyContext = createContext<NotifyContextProps>({});

async function loadApiData(ticker: string): Promise<CoinInfo>{
   return await CoinApi.getCoinInfo(ticker);
}

function NotifyProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
    const loadData = async (ticker: string) => await loadApiData(ticker);
    const [showNotify, setShowNotify] = useState<boolean>(true);

    return (
        <NotifyContext.Provider value={{ loadData, showNotify, setShowNotify }}>
            { children }
        </NotifyContext.Provider>
    );

}

export default NotifyProvider;