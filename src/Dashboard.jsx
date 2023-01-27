import React, { useEffect, useState, useRef } from "react";
import DataInput from "./DataInput";
import DataList from "./DataList";
import UnitToggle from "./UnitToggle";
import axios from "axios";
import utils from "./utilities.js";
import LineChart from "./LineChart";
import { please } from "./please.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./authentication/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import "./App.css";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [weightData, setWeightData] = useState([]);
  const [petList, setPetList] = useState([]);
  const [petData, setPetData] = useState([]);
  const [isLbs, setIsLbs] = useState(false);
  //using setRefreshPage as a lifted state to update entire dashboard via effect
  const [refreshPage, setRefreshPage] = useState(false);

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

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    if (!user) return navigate("/");
    console.log("username is ", userName);

    //get data from db for user
    please
      .fetchDataByUser(userName)
      .then((res) => {
        // let pets = [...new Set(res.data.map((el) => el.name))];

        //get unique pets and order by color index
        let pets = [];
        res.data.forEach((pet, i) => {
          if (pet.color === 1) pets[0] = pet.name;
          if (pet.color === 2) pets[1] = pet.name;
          if (pet.color === 3) pets[2] = pet.name;
          if (pet.color === 4) pets[3] = pet.name;
          if (pet.color === 5) pets[4] = pet.name;
        });

        setPetList(pets);
        setWeightData(res.data);
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
      .filter((x) => x)
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

    setPetData(prunedData);
  }, [weightData, isLbs]);

  let changeUnit = (e) => {
    setIsLbs((isLbs) => !isLbs);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{userName}</div>
        {/* <div>{user?.email}</div> */}
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
      <DataList
        data={weightData}
        isLbs={isLbs}
        user={user}
        fetchData={please.fetchData}
        refresh={setRefreshPage}
      />
      <UnitToggle isLbs={isLbs} changeUnit={changeUnit} />
      <div className="graph_input_container">
        {weightData.length && weightData.length > 0 ? (
          <LineChart pets={petList} data={petData} refresh={setRefreshPage} />
        ) : null}
        <DataInput
          user={userName}
          pets={petList}
          fetchData={please.fetchData}
          refresh={setRefreshPage}
        />
      </div>
    </div>
  );
}
export default Dashboard;
