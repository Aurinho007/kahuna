import * as React from 'react';
import { useContext, useState,  useEffect  } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { NotifyContext } from '../../contexts/NotifyContext';
import Controller from '../../controllers/Controller';
import Investiment from '../../types/Investiment';
import BodyNotifyModal from '../BodyNotifyModal';
import './index.css'

function ModalNotify() {
    const [showThis, setShowThis] = useState<boolean>(false);

    const handleClose = () => setShowThis(false);

    useEffect(() => {
        setTimeout(() => {
            setShowThis(Controller.needToNotify());
        }, 3000)
    }, [])
    
    return ( 
        <Modal show={showThis} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notificação de rendimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div className="modal-notify-container">
                <BodyNotifyModal/>
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