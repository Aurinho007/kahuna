import * as React from 'react';
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Controller from '../controllers/Controller';
import Investiment from '../types/Investiment';

interface UserContextProps {
    filterType?: string
    investimentsToShow?: Investiment[]
    setFilterType?: (type: string) => void;
    setInvestimentsToShow?: (investiments: Investiment[]) => void;
}

export const UserContext = createContext<UserContextProps>({});

function UserProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
    const [filterType, setFilterType] = useState<string>("name");
    const [investimentsToShow, setInvestimentsToShow] = useState<Investiment[]>();

    useEffect(() => {
        setInvestimentsToShow(Controller.getAllInvestiments());
    }, [])

    return (
        <UserContext.Provider value={{ filterType, setFilterType, investimentsToShow, setInvestimentsToShow }}>
            { children }
        </UserContext.Provider>
    );

}

export default UserProvider;