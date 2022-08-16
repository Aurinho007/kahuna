import * as React from 'react';
import { createContext } from "react";
import CoinApi from '../services/CoinApi';
import CoinInfo from '../types/CoinInfo';

interface NotifyContextProps {
    loadData?: (ticker: string) => Promise<CoinInfo>
}

export const NotifyContext = createContext<NotifyContextProps>({});

async function loadApiData(ticker: string): Promise<CoinInfo>{
   return await CoinApi.getCoinInfo(ticker);
}

function NotifyProvider({ children }: { children: JSX.Element[] | JSX.Element }) {

    const loadData = async (ticker: string) => await loadApiData(ticker);

    return (
        <NotifyContext.Provider value={{ loadData }}>
            { children }
        </NotifyContext.Provider>
    );

}

export default NotifyProvider;