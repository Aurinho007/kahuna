import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import CoinApi from '../../services/CoinApi';
import toast from 'react-hot-toast';
import './index.css';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import Controller from '../../controllers/Controller';
import Investiment from '../../types/Investiment';
import { dateToTextFR, formatPrice, maskPrice, moneyStringToFloat, textToDate } from '../../helpers/Helper'; 
import { UserContext } from '../../contexts/UserContext';

interface ModalAddInvest {
    headerTitle: string
    mainButtonText: string
    isAddInvest: boolean
    showModalAddInvest: boolean
    setShowModalAddInvest: Dispatch<SetStateAction<boolean>>
    invest?: Investiment
}

function ModalAddInvest(props: ModalAddInvest) {
    const { setInvestimentsToShow } = useContext(UserContext)
    const handleClose = () =>  props.setShowModalAddInvest(false) 
    const [coin, setCoin] = useState<string>('');
    const [simbol, setSimbol] = useState<string>('Cripto')
    const [purchaseDate, setPurchaseDate] = useState<string>(dateToTextFR(new Date()));
    const [purchasePrice, setPurchasePrice] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    const [cripto, setCripto] = useState<number>(0)

    useEffect(() => {
        if(props.invest){
            setCoin(`${props.invest.ticker} - ${props.invest.name}`);
            formatSimbol(coin);
            setPurchaseDate(dateToTextFR(new Date(props.invest.purchaseDate)));
            setPurchasePrice(String(props.invest.purchasePrice));
            setAmount(String(props.invest.amount));
        }

    }, [])

    useEffect(() => {

        setCripto(
            moneyStringToFloat(amount) / 
            moneyStringToFloat(purchasePrice)
            )

    }, [amount, purchasePrice])

    function handleSubmit(): void {
        if(!validateFields()) {
            return;
        }

        if(props.isAddInvest)
            createInvestiment()
        else
            updateInvestiment()
    }

    function createInvestiment(){

        const investiment: Investiment = {
            id: 0,
            ticker: coin.split(' - ')[0],
            name: coin.split(' - ')[1],
            purchasePrice: formatPrice(purchasePrice),
            amount: formatPrice(amount),
            purchaseDate: new Date(purchaseDate.replaceAll('-', ',')),
            favorite: false
        }
        
        Controller.saveInvestiment(investiment);
        clearInputs();
        handleClose();
        toast.success('Investimento adicionado!');
    }

    function updateInvestiment(){

        Controller.updateInvestiment({
            id: props.invest?.id ? props.invest?.id : 0,
            amount: moneyStringToFloat(amount),
            favorite: props.invest?.favorite ? props.invest?.favorite : false,
            name: coin.split(" - ")[1],
            purchaseDate: textToDate(purchaseDate),
            purchasePrice: moneyStringToFloat(purchasePrice),
            ticker: coin.split(" - ")[0]
        })
        setInvestimentsToShow && setInvestimentsToShow(Controller.getAllInvestiments());
        handleClose()
    }

    function validateFields(): boolean {
        if(!(coin && purchaseDate && purchasePrice && amount)) {
            toast.error('Preencha todos os campos!');
            return false;
        }

        if(CoinApi.getAllCoins().filter(c => (c.ticker +' - '+ c.name) === coin).length === 0){
            toast.error('A moeda selecionada não está disponível');
            return false
        }

        if(parseFloat(amount.replaceAll(".","").replace(",",".")) < 1){
            toast.error('A quantia comprada não pode ser menor que R$ 1,00');
            return false
        }

        return true;
    }

    function clearInputs() {
        setCoin('');
        setPurchaseDate(String(new Date()));
        setPurchasePrice('');
        setAmount('');
    }

    function formatSimbol(input: string) {
        CoinApi.getAllCoins().map(coin => {
            if(coin.ticker === input.split(' - ')[0]) {
                setSimbol(input.split(' - ')[0])
            }
        })
    }

    return <>
        <Modal show={props.showModalAddInvest} onHide={handleClose} className="modal" centered> 
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">{props.headerTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
            <Container>
            <Form>
                <Row>
                    <Col xs={16} md={12}>
                    <Form.Group className="mb-3" controlId="coinName">
                        <Form.Label className="label-input">Moeda comprada</Form.Label>
                        <Form.Control
                            className="modal-input"
                            type="text"
                            autoFocus
                            list="coins"
                            autoComplete='off'
                            spellCheck={false}
                            defaultValue={coin}
                            onChange={(e) => setCoin(e.target.value)}
                            onBlur={(e) => formatSimbol(e.target.value)}
                        />

                        <datalist id="coins">
                            {CoinApi.getAllCoins().map(coin => {
                                return <option key={coin.ticker} value={coin.ticker + " - " +  coin.name} />;
                            })}
                        </datalist>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={16} md={12}>
                        <Form.Group className="mb-3" controlId="purchaseDate">
                            <Form.Label className="label-input">Data da compra</Form.Label>
                            <Form.Control
                                className="modal-input"
                                type="date"
                                autoComplete='off'
                                value={purchaseDate}
                                max={ dateToTextFR(new Date()) }
                                onChange={(e) => setPurchaseDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={16} md={12}>
                        <Form.Group className="mb-3" controlId="purchasePrice">
                            <Form.Label className="label-input">Preço da moeda na data da compra</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="type-label">R$</InputGroup.Text>
                                <Form.Control
                                    className="modal-input"
                                    autoComplete='off'
                                    value={purchasePrice}
                                    onInput={(e) => maskPrice(e.currentTarget.value, setPurchasePrice)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={16} md={12}>
                        <Form.Group className="mb-3" controlId="amount">
                            <Form.Label className="label-input">Quantia comprada</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="type-label">R$</InputGroup.Text>
                                <Form.Control
                                    className="modal-input"
                                    autoComplete='off'
                                    value={ amount }
                                    onInput={ (e) => maskPrice(e.currentTarget.value, setAmount) }
                                     
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={16} md={12}>
                        <Form.Group className="mb-3" controlId="amount">
                            <Form.Label className="label-input">Quantia em cripto</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text className="type-label">{ simbol }</InputGroup.Text>
                                <Form.Control
                                    className="modal-input readonly"
                                    autoComplete='off'
                                    readOnly
                                    value={ cripto > 0 && moneyStringToFloat(amount) >= 1 && String(cripto) !== 'Infinity' ? (parseFloat(cripto.toFixed(6))) : '-' }
                                    onInput={(e) => maskPrice(e.currentTarget.value, setAmount)}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-modal-close" onClick={handleClose}>
                    Fechar
                </Button>
                <Button className="btn-modal-save" onClick={handleSubmit}>
                    {props.mainButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

export default ModalAddInvest;