import * as React from 'react';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import './index.css'

function ModalNotify() {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
                                <tr>
                                    <td>
                                        BTC
                                    </td>
                                    <td>
                                        12%
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ETH
                                    </td>
                                    <td>
                                        17%
                                    </td>
                                </tr>
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