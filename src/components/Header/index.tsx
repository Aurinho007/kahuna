import * as React from 'react';
import './index.css'
import { FaRegBell, FaBell } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import KButton from '../KButton';
import { useNavigate } from 'react-router-dom';
import Controller from '../../controllers/Controller';
import toast from 'react-hot-toast';

function Header() {
    const [activeBell, setActiveBell] = useState<boolean>(Controller.needToNotify());
    const navigate = useNavigate();

    function changeBell() {
        Controller.changeNotifications()
        if(Controller.needToNotify()) {
            toast.success('Notificações ativadas para moedas com rendimento acima de 10%')
        } else {
            toast('Notificações desativadas!')
        }
        setActiveBell(!activeBell)
    }

    return (
        <>
            <header id="header">
                <div id="header-container-img-logo" onClick={() => {navigate('/')}}>
                    <img 
                        id="img-logo" 
                        src="/images/logo.png" 
                        alt="Imagem do site Kahuna"
                    />
                    <p id="text-logo">ahuna</p>
                </div>
                <div id="header-container-btn">
                    <button 
                        className="header-btn" 
                        id="btn-add-invest" 
                        onClick={() => {
                            navigate('/manager');
                        }}
                        >
                        Gerenciar
                    </button>

                    <KButton 
                        id="btn-how-use" 
                        text="Mercado"
                        onClick={() => {
                            navigate('/market');
                        }}
                    />
                    {
                        activeBell ? 
                        <FaBell 
                            className='btn-bell' 
                            onClick={() => changeBell()}
                        /> 
                        : 
                        <FaRegBell 
                            className='btn-bell' 
                            onClick={() => changeBell()}
                        /> 
                    }
                </div>
            </header>
        </>
    );
}

export default Header;

