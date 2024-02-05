import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmDelete({ pet }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
        disabled={pet ? false : true}
      >
        Delete Data
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        className="confirmDeleteModal"
        dialogClassName=" modal-100h"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            Really delete all data{`${pet === "all" ? "" : ` for ${pet}`}?`}
          </h5>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="danger" className="col-3">
            Yes, Delete
          </Button>
          <Button variant="secondary" className="col-3" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDelete;
