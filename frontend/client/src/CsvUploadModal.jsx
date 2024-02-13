import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { please } from "./please.js";
import utils from "./utilities.js";

function CsvUploadModal({ userName, petCount, refresh }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [parsed, setParsed] = useState([]);

  const [csv, setCsv] = useState("");
  const [petName, setPetName] = useState("");

  ///////////////////

  useEffect(() => {
    console.log("EFFECTED");
    if (parsed.length < 1) return;
    let colorIndex = petCount + 1;
    please.uploadCsv(userName, colorIndex, petName, parsed);
  }, [parsed]);

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setCsv(file);
  };

  const handleNameUpdate = (e) => {
    setPetName(e.target.value);
  };

  // const sendData = (userName, colorIndex, petName, parsed) => {
  //   console.log("now sending data ////////////////", parsed);
  //   please.uploadCsv(userName, colorIndex, petName, parsed);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    let colorIndex = petCount + 1;
    let parsedData = [];

    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      let csvRows = text.split("\n").slice(1);

      csvRows.forEach((r, i) => {
        let [date, weight] = r.split(",");
        date = utils.getFormattedDateDB(date);
        weight = parseInt(weight);
        parsedData.push({ date, weight });
      });

      setParsed(parsedData);
    };

    reader.readAsText(csv);

    // reader.addEventListener(
    //   "loadend",
    //   sendData(userName, colorIndex, petName, parsedData)
    // );

    please
      .uploadCsv(userName, colorIndex, petName, parsed)
      .then(() => refresh((val) => !val));
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        disabled={petCount >= 5 ? true : false}
      >
        Upload CSV
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        className=""
        dialogClassName=" modal-100h"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload CSV Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Data should be for a single pet and should have only two columns:
            date, and weight <i>in grams</i>. Please ensure that you have
            formatted your CSV file accordingly.
          </p>
          <form encType="multipart/form-data">
            <label htmlFor="newPetName">Name: </label>
            <input
              type="text"
              id="newPetName"
              onChange={(e) => handleNameUpdate(e)}
            ></input>
            <input
              type="file"
              accept=".csv"
              id="myFile"
              name="uploaded_file"
              onChange={(e) => handleChange(e)}
              onSubmit={(e) => handleSubmit(e)}
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" className="col-3" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="col-3"
            onClick={(e) => handleSubmit(e)}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CsvUploadModal;
