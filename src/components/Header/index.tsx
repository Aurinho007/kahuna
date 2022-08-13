import * as React from 'react';
import './index.css'
import { FaRegBell, FaBell } from 'react-icons/fa'
import { useState } from 'react';
import KButton from '../KButton';

function Header() {
    const [activeBell, setActiveBell] = useState<boolean>(false);

    return (
        <>
            <header id="header">
                <div id="header-container-img-logo">
                    <img id="img-logo" src="/images/logo.png" alt="Imagem do site Kahuna"/>
                    <p id="texto-logo">ahuna</p>
                </div>
                <div id="header-container-btn">
                    <button className="header-btn" id="btn-add-invest">Gerenciar</button>
                    <KButton id="btn-how-use" text="Saiba mais"/>
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