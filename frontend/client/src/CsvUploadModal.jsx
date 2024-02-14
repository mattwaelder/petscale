import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { please } from "./please.js";
import utils from "./utilities.js";

function CsvUploadModal({ userName, petList, petCount, refresh }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [parsed, setParsed] = useState([]);

  const [csv, setCsv] = useState("");
  const [petName, setPetName] = useState("");

  ///////////////////

  useEffect(() => {
    if (parsed.length < 1) return;

    let colorIndex;
    if (petList.includes(petName)) {
      colorIndex = petList.indexOf(petName);
    } else {
      colorIndex = petCount + 1;
    }

    please
      .uploadCsv(userName, colorIndex, petName, parsed)
      .then(() => refresh((val) => !val));
  }, [parsed]);

  const handleChange = (e) => {
    let file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setCsv(file);
  };

  const handleNameUpdate = (e) => {
    setPetName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let parsedData = [];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const text = e.target.result;
        //split into rows (exclude headers)
        let csvRows = text.split("\n").slice(1);

        //for every row, parse data and push to parsedData
        csvRows.forEach((r, i) => {
          let [date, weight] = r.split(",");
          date = utils.getFormattedDateDB(date);
          weight = parseInt(weight);

          //if date or weight are invalid, throw error
          if (date === "error" || weight <= 0) {
            let err = `Error. CSV data for row ${i + 1} is invalid\n
            Expected: yyyy-mm-dd,NATURAL_NUMBER(g)\n
            Got: ${r}`;
            throw new Error(err);
          }
          parsedData.push({ date, weight });
        });

        //parsed update causes effect hook which posts data to server
        setParsed(parsedData);

        //catch and alert erros w/ csv file
      } catch (error) {
        alert(error);
      }
    };

    reader.readAsText(csv);
  };

  return (
    <>
      <Button
        variant="primary"
        className="csv-btn"
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
