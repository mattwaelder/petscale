import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import utils from "../utilities.js";

function CsvDownloadModal({ petList, petData, refresh }) {
  //modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedPet, setSelectedPet] = useState("");

  //hanlde pet selection
  const handleChange = (e) => {
    setSelectedPet(e.target.value);
  };

  //create & dl csv, reset
  const handleSubmit = (selectedPet, petData) => {
    utils.createCsvByPet(selectedPet, petData);
    setSelectedPet("");
    handleClose();
    refresh((val) => !val);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Download CSV
      </Button>

      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Download CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A CSV file can be useful for backing up your data. It can also be
            used by spreadsheet programs like excel.
          </p>
          <label htmlFor="pet-csv">Pet: </label>
          <select
            name="pet-csv"
            onChange={(e) => handleChange(e)}
            id="pet-csv"
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
          </select>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmit(selectedPet, petData)}
            disabled={selectedPet ? false : true}
          >
            Download CSV
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CsvDownloadModal;
