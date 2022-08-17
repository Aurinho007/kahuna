import * as React from 'react';
import './index.css'
import { FaRegBell, FaBell } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import KButton from '../KButton';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [activeBell, setActiveBell] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(activeBell) alert("Em breve!")
    }, [activeBell])

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
                            onClick={() => setActiveBell(!activeBell)}
                        /> 
                        : 
                        <FaRegBell 
                            className='btn-bell' 
                            onClick={() => setActiveBell(!activeBell)}
                        /> 
                    }
                </div>
            </header>
        </>
    );
}

export default Header;

