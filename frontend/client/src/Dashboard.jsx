import React, { useEffect, useState, useRef } from "react";
// import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { BsFiletypeCsv } from "react-icons/bs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import DataInput from "./DataInput";
import DataList from "./DataList";
import CsvDownloadModal from "./CsvDownloadModal";
import CsvUploadModal from "./CsvUploadModal";
import DeleteModal from "./DeleteModal";
import UnitToggle from "./UnitToggle";
import axios from "axios";
import utils from "./utilities.js";
import LineChart from "./LineChart";
import { please } from "./please.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./authentication/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import "./App.scss";

function Dashboard() {
  //////////////////  STATES  /////////////////////////
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  //weight data is response from server
  const [weightData, setWeightData] = useState([]);
  //displayed data is filtered version of weightData
  const [displayedData, setDisplayedData] = useState([]);
  const [petList, setPetList] = useState([]);
  const [petCount, setPetCount] = useState(0);
  //petdata = data for chart.js
  const [petData, setPetData] = useState([]);
  const [limit, setLimit] = useState("none");
  //trimmed version of petData using limit state
  const [trimmedData, setTrimmedData] = useState([]);
  const [isLbs, setIsLbs] = useState(false);
  //using setRefreshPage as a lifted state to update entire dashboard via effect
  const [refreshPage, setRefreshPage] = useState(false);
  //offcanvas login
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //////////////////////////////////////////

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserName(
        data.name.includes(" ") ? data.name.split(" ").join("") : data.name
      );
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  //////////////  EFFECT HOOKS  //////////////

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    setPetCount(petList.filter((pet) => pet).length);
  }, [petList]);

  useEffect(() => {
    if (!user) return navigate("/");
    // console.log("username is:", userName);
    handleClose();

    //get data from db for user
    please
      .fetchDataByUser(userName)
      .then((res) => {
        // let pets = [...new Set(res.data.map((el) => el.name))];

        //get unique pets and order by color index
        //could be optimized to be less than O(n) linear... break if pets.len > 5
        // let pets = [null, null, null, null, null];
        // res.data.forEach((pet, i) => {
        //   if (pet.color && pet.color === 1) pets[0] = pet.name;
        //   if (pet.color && pet.color === 2) pets[1] = pet.name;
        //   if (pet.color && pet.color === 3) pets[2] = pet.name;
        //   if (pet.color && pet.color === 4) pets[3] = pet.name;
        //   if (pet.color && pet.color === 5) pets[4] = pet.name;
        // });

        setWeightData(res.data.petData);
        if (res.data.ownerData[0]?.pets.length) {
          setPetList(res.data.ownerData[0].pets);
        }
      })
      .catch((err) => console.log(err));
  }, [refreshPage, userName]);

  useEffect(() => {
    //create datasets for each possible pet
    let d1 = utils.getLineGraphValues(petList, weightData, isLbs, 0);
    let d2 = utils.getLineGraphValues(petList, weightData, isLbs, 1);
    let d3 = utils.getLineGraphValues(petList, weightData, isLbs, 2);
    let d4 = utils.getLineGraphValues(petList, weightData, isLbs, 3);
    let d5 = utils.getLineGraphValues(petList, weightData, isLbs, 4);

    let fullSet = [d1, d2, d3, d4, d5];

    //prune by pet count and format arr to be what chart.js expects

    let prunedData = fullSet
      .map((d) => (d.length > 0 ? d : null))
      .map((d, i) => {
        return {
          label: petList[i],
          data: d,
          backgroundColor: `${utils.colorSet[i]}`,
          borderColor: `${utils.colorSet[i + 5]}`,
          options: {
            plugins: {
              tooltip: {
                callbacks: {
                  title: (context) => {
                    console.log(context);
                  },
                },
              },
            },
          },
        };
      });

    //update graph
    setPetData(prunedData.filter((x) => x.label));
    //update list
    setDisplayedData(weightData);
  }, [weightData, isLbs]);

  //when limit is updated
  useEffect(() => {
    //trim petData to limit --> setTrimmedData
    setTrimmedData(utils.trimData(petData, limit));
  }, [limit, petData]);

  //////////////////////////////////////////

  //change lbs <--> grams
  const changeUnit = (e) => {
    setIsLbs((isLbs) => !isLbs);
  };

  //filter the displayed data (list)
  const handleFilter = (e) => {
    let selectedPet = petList[e.target.value - 1] || null;
    //if no filter, display all & return
    if (!selectedPet) {
      setDisplayedData(weightData);
      return;
    }
    let tempData = weightData.filter((data, i) => data.name === selectedPet);
    setDisplayedData(tempData);
  };

  return (
    <div className="dashboard">
      <h5 id="header">PetScale</h5>
      <div className="dashboard__container dashboard__login_container">
        <>
          <FaBars
            id="user_icon_btn"
            onClick={handleShow}
            // value={{ className: "react-icons-user" }}
          />
          <label htmlFor="user_icon_btn" id="welcomeUser">
            <p>Hey, {userName}</p>
          </label>

          <Offcanvas id="off_canvas" show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <h2 id="offCanvasHeader">PetScale</h2>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="offCanvasBody">
                <div className="offCanvasChild">
                  <p id="signedInAs">Signed in as {`${userName}`}</p>
                  <Button
                    className="dashboard__btn logout_btn"
                    variant="secondary"
                    onClick={logout}
                  >
                    Log Out?
                  </Button>
                </div>
                <div className="csv_btn_container offCanvasChild">
                  <BsFiletypeCsv className="csvIcon" />
                  <div className="csv_btn_wrapper">
                    <CsvDownloadModal
                      petList={petList}
                      petData={petData}
                      refresh={setRefreshPage}
                    />
                    <CsvUploadModal
                      userName={userName}
                      petList={petList}
                      petCount={petCount}
                      refresh={setRefreshPage}
                    />
                  </div>
                </div>
                <div className="offCanvasChild deleteDataBtn">
                  <DeleteModal
                    userName={userName}
                    petList={petList}
                    refresh={setRefreshPage}
                  />
                </div>
              </div>
              <small id="backgroundCitation">
                Image by rawpixel.com on Freepik
              </small>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </div>
      {petCount > 0 && (
        <div className="grid-list_container">
          <DataList
            id="grid-list"
            data={displayedData}
            isLbs={isLbs}
            user={user}
            fetchData={please.fetchData}
            refresh={setRefreshPage}
            pets={petList}
            handleFilter={handleFilter}
            changeUnit={changeUnit}
          />
        </div>
      )}
      <div className="grid-chart_container">
        {weightData.length && weightData.length > 0 ? (
          <LineChart
            id="grid-chart"
            pets={petList}
            data={petData}
            trimmedData={trimmedData}
            limit={limit}
            setLimit={setLimit}
            refresh={setRefreshPage}
          />
        ) : null}{" "}
      </div>
      <div className="grid-input_container">
        <DataInput
          id="grid-input"
          user={userName}
          pets={petList}
          petCount={petCount}
          fetchData={please.fetchData}
          refresh={setRefreshPage}
        />
      </div>
    </div>
  );
}
export default Dashboard;
