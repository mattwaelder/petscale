import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { please } from "./please.js";

function ConfirmDelete({ userName, pet, refresh }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //delete all data for selected pet
  const handleDeleteData = (userName, pet) => {
    let isFullWipe = false;

    //catch any issues before handing off
    if (!pet || !userName) {
      console.log(
        "error handling delete request, missing username or pet name"
      );
      return;
    }

    //if deleting all pets, set boolean to true
    if (pet === "all") isFullWipe = true;

    please
      .deleteData(userName, pet, isFullWipe)
      .then(() => refresh((val) => !val));
  };

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
          {pet === "all" ? (
            <h5>
              Really delete <b>all</b> data?
            </h5>
          ) : (
            <h5>
              Really Delete all data for <b>{pet.toUpperCase()}</b>
            </h5>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant="danger"
            className="col-3"
            onClick={() => handleDeleteData(userName, pet)}
          >
            Yes, Delete
          </Button>
          <Button variant="primary" className="col-3" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDelete;
