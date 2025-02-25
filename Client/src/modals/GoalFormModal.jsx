import React from 'react';
import {Modal, Button} from 'react-bootstrap'
import GoalForm from '../components/GoalForm';

export default function GoalFormModal({ show, onHide }) { //show and onHide
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Add Goal</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <GoalForm />
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}