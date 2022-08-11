import * as React from 'react';
import './index.css'

function Header() {

    return (
        <>
            <header id="header">
                <div id="header-container-img-logo">
                    <img id="img-logo" src="../../public/images/logo.png" alt="Imagem do site Kahuna"/>
                    <p id="texto-logo">ahuna</p>
                </div>
                <div id="header-container-btn">
                    <button className="primary-btn" id="btn-add-invest">Adicionar</button>
                    <button className="primary-btn" id="btn-how-use">Saiba Mais</button>
                </div>
            </header>
        </>
     );
}

export default Header;