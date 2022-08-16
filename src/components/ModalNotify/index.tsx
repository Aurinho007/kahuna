import * as React from 'react';
import { useContext, useState,  useEffect  } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { NotifyContext } from '../../contexts/NotifyContext';
import Controller from '../../controllers/Controller';
import CoinInfo from '../../types/CoinInfo';
import Investiment from '../../types/Investiment';
import BodyNotifyModal from '../BodyNotifyModal';
import './index.css'

function ModalNotify() {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [dataApi, setDataApi] = useState()

    const context = useContext(NotifyContext);

    const investiments: Array<Investiment> = Controller.getAllInvestiments();    

    
    
    return ( 
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notificação de rendimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="modal-notify-container">
                <div className="title-container">
                    <p className='modal-notify-title'>As moedas abaixo renderam mais de 10%</p>
                </div>

                    <Table className='modal-notify-table' striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>
                                    Moeda
                                </th>
                                <th>
                                    Rendimento
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                investiments.map((inv) => {
                                    return (
                                        <BodyNotifyModal key={inv.id} inv={inv}/>
                                    );
                                })
                            }
                        </tbody>
                    </Table>

                
            </div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
     );
}

export default ModalNotify;