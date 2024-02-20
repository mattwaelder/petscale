import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import ConfirmDelete from "./ConfirmDeleteModal.jsx";

function DeleteModal({ userName, petList, refresh }) {
  const [show, setShow] = useState(false);
  const [selectedPet, setSelectedPet] = useState("");

  const handleClose = () => {
    setSelectedPet("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //pet to delete, or "all"
  const handleChange = (e) => {
    setSelectedPet(e.target.value);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Data
      </Button>

      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Delete Your Data?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You can delete all data or just the data for a single pet.{" "}
            <u>This cannot be undone.</u>
            <br></br>
            <br></br>
            <b>
              It is strongly recommended that you download a CSV file of your
              data before continuing!
            </b>
          </p>
          <label htmlFor="delete-select">To Delete: </label>
          <select
            name="delete-select"
            onChange={(e) => handleChange(e)}
            id="delete-select"
            className="form_select"
            required
          >
            <option value="">--select--</option>
            {petList.map(
              (pet, i) =>
                petList[i] && (
                  <option value={`${petList[i]}`} key={i}>
                    {`${petList[i]}`}
                  </option>
                )
            )}
            <option value="all">All Data</option>
          </select>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ConfirmDelete
            userName={userName}
            pet={selectedPet}
            refresh={refresh}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
