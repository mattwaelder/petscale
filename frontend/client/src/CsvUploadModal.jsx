import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { please } from "./please.js";
import utils from "./utilities.js";

function CsvUploadModal({ userName, petList, petCount, refresh }) {
  const [show, setShow] = useState(false);
  const [parsed, setParsed] = useState([]);
  const [csv, setCsv] = useState("");
  const [petName, setPetName] = useState("");

  const handleClose = () => {
    setCsv("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

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

  const nameValidation = (name) => {
    let nameArr = name.split("");
    const invalid = ["\\", "/", "<", ">", "`", "%", "$", "."];
    return nameArr.some((char) => invalid.includes(char));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let parsedData = [];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        //if name is invalid, throw error
        if (
          petName.length < 3 ||
          nameValidation(petName) ||
          petName.toLowerCase() === "all"
        ) {
          throw new Error(
            "The name you've entered is not valid\nNames must be longer than 2 characters and not include special characters."
          );
        }

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
            let err = `CSV DATA FOR ROW ${i + 1} IS INVALID\n
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
          <ul>
            <li>Data should be for a single pet</li>
            <li>Data should have only 2 columns, Date & Weight</li>
            <li>Format date as follows: yyyy-mm-dd</li>
            <li>Weight is expected in grams</li>
          </ul>
          <form encType="multipart/form-data">
            <label htmlFor="newPetName">Pet name: </label>
            <input
              type="text"
              id="newPetName"
              autoComplete="off"
              minLength="3"
              onChange={(e) => handleNameUpdate(e)}
              required
            ></input>
            <input
              type="file"
              accept=".csv"
              id="myFile"
              name="uploaded_file"
              onChange={(e) => handleChange(e)}
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
            disabled={csv && petName ? false : true}
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
