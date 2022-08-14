import * as React from 'react';
import Header from '../../components/Header';
import { FiArrowRight } from 'react-icons/fi';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return <>
        <Header/>
        <div className="home">
            <div className="home-container fst-container">
                <h1>Gerencie sua criptomoedas</h1>
                <h5>Mantenha o controle sobre seus investimentos de forma fácil</h5>
                <button onClick={() => {
                    navigate('/manager');
                }}>
                    <span>Comece agora</span>
                    <FiArrowRight className='arrow-right'/>
                </button>
            </div>
            <div className="home-container snd-container">
                <img src="/animations/wallet.gif" alt="Gif de carteira de criptomoedas" />
            </div>
        </div>
    </>;
}

export default Home;