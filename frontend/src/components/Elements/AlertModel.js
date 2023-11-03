import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonLoader from "./ButtonLoader";

const AlertModel = ({ show, handleClose, title, body, handleButton, isLoading, buttonName }) => {
  return (
    <Modal show={show} onHide={handleClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleButton} disabled={isLoading} variant="danger">
          {isLoading ? <ButtonLoader /> : buttonName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModel;
