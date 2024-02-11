import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { please } from "./please.js";

function CsvUploadModal({ userName, petCount }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [csv, setCsv] = useState("");

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    setCsv(file);
  };
  const handleUpload = (e) => {
    // console.log("upload this csv", csv);
    // please.uploadCsv(userName, "newpet", csv).then((res) => console.log(res));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let formData = new FormData();
    // formData.append("file", csv);

    // console.log("upload this formData", csv);
    // please
    //   .uploadCsv(userName, "newpet", csv)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      // console.log(text);
      let csvRows = text.split("\n").slice(1);
      console.log(csvRows);
    };
    reader.readAsText(csv);
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
            <input type="text" id="newPetName"></input>
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
