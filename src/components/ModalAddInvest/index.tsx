import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import CoinApi from '../../services/CoinApi';
import toast, { Toaster } from 'react-hot-toast';
import './index.css';
import { useState } from 'react';
import Controller from '../../controllers/Controller';
import Investiment from '../../types/Investiment';
import { dateToTextFR, formatPrice } from '../../helpers/DateHelper'; 

interface ModalAddInvest {
    headerTitle: string
    mainButtonText: string
    showModalAddInvest: boolean
    setShowModalAddInvest: (value: boolean) => void
}

function ModalAddInvest(props: ModalAddInvest) {
    const handleClose = () => props.setShowModalAddInvest(false);
    const [coin, setCoin] = useState<string>('');
    const [purchaseDate, setPurchaseDate] = useState<string>(dateToTextFR(new Date()));
    const [purchasePrice, setPurchasePrice] = useState<string>('');
    const [amount, setAmount] = useState<string>('');

    function handleSubmit(): void {
        if(!validateFields()) {
            toast.error('Preencha todos os campo');
            return;
        }

        const investiment: Investiment = {
            id: 0,
            ticker: coin.split(' - ')[0],
            name: coin.split(' - ')[1],
            purchasePrice: formatPrice(purchasePrice),
            amount: formatPrice(amount),
            purchaseDate: new Date(purchaseDate.replaceAll('-', ','))
        }
        Controller.saveInvestiment(investiment);
        clearInputs();
        handleClose();
        toast.success('Investimento adicionado!');
    }

    function validateFields(): boolean {
        if(!(coin && purchaseDate && purchasePrice && amount)) {
            return false;
        }
        return true;
    }

    function clearInputs() {
        setCoin('');
        setPurchaseDate('');
        setPurchasePrice('');
        setAmount('');
    }

    return <>
        <Toaster
            toastOptions={{className: 'toaster'}}
            position="top-right"
            reverseOrder={false}
        />
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
                            value={coin}
                            onChange={(e) => setCoin(e.target.value)}
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
                                    onChange={(e) => setPurchasePrice(e.target.value)}
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
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
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