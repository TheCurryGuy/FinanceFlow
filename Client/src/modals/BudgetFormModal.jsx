import React from 'react';
import { Modal, Button} from 'react-bootstrap'; // Import
import BudgetForm from '../components/BudgetForm';

export default function BudgetFormModal({ show, onHide }) { // Use show and onHide
  return (
    <Modal show={show} onHide={onHide} >
      <Modal.Header closeButton  className="bg-dark text-white">
        <Modal.Title >Add Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <BudgetForm />
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}