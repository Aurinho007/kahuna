import reacr from 'react'
import Controller from '../../controllers/Controller'
import './index.css'

function ImageDefaultInvestment(){
        const investiments = Controller.getAllInvestiments()

        if(investiments.length == 0)
            return (
                <section id="container-default-investiment">
                    <img
                        id="default-investment"
                        src="../../images/defaultInvestment.svg"
                        alt="Imagem de um gráfico de investimentos"
                    />
                    <span id="default-investment-text">Você ainda não possui nenhum investimento...</span>
                </section>
            )
        else
            return (
                <>
                </>
            )
        
    }

export default ImageDefaultInvestment