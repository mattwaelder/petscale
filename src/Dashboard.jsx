import React, { useEffect, useState, useRef } from "react";
import DataInput from "./DataInput";
import DataList from "./DataList";
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
    //
    console.log("user: ", user);
  }, [user, loading]);

  // useEffect(() => {
  //   //using this as a lifted state to allow subcomponents to refresh sibling components
  //   console.warn("page refresh called");
  // }, [refreshPage]);

  useEffect(() => {
    if (!user) return navigate("/");
    console.log("username is ", userName);
    please
      // .fetchDataByUser(user.displayName ? userName : "anon")
      .fetchDataByUser(userName)
      .then((res) => {
        //gets unique pet values from weight data
        let pets = [...new Set(res.data.map((el) => el.name))];

        setPetList(pets);
        setWeightData(res.data);
        // console.log(res.data);
        console.log("////////", userName, res.data);
        res.data.forEach((x) => console.log(x.created_at));
      })
      .catch((err) => console.log(err));
  }, [refreshPage, userName]);

  useEffect(() => {
    //create datasets for each possible pet
    let d1 = utils.getLineGraphValues(petList, weightData, 0);
    let d2 = utils.getLineGraphValues(petList, weightData, 1);
    let d3 = utils.getLineGraphValues(petList, weightData, 2);
    let d4 = utils.getLineGraphValues(petList, weightData, 3);
    let d5 = utils.getLineGraphValues(petList, weightData, 4);

    let fullSet = [d1, d2, d3, d4, d5];

    let colorSet = {
      0: "rgba(200,50,50,0.8)",
      1: "rgba(50,50,200,0.8)",
      2: "rgba(50,200,50,0.8)",
      3: "rgba(200,0,200,0.8)",
      4: "rgba(20,20,20,0.8)",
      5: "rgba(200,50,50,0.5)",
      6: "rgba(50,50,200,0.5)",
      7: "rgba(50,200,50,0.5)",
      8: "rgba(200,0,200,0.5)",
      9: "rgba(20,20,20,0.5)",
    };
    //prune by pet count and format arr to be what chart.js expects
    let prunedData = fullSet
      .map((d) => (d.length > 0 ? d : null))
      .filter((x) => x)
      .map((d, i) => {
        return {
          label: petList[i],
          data: d,
          backgroundColor: `${colorSet[i]}`,
          borderColor: `${colorSet[i + 5]}`,
          // options: { scales: { x: { type: "time" } } },
        };
      });
    // console.log(prunedData);

    setPetData(prunedData);
  }, [weightData]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{userName}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
      <DataList
        data={weightData}
        user={user}
        fetchData={please.fetchData}
        refresh={setRefreshPage}
      />
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

/*

return(
  <DataList data={weightData} user={user} fetchData={fetchData} />
      <div className="graph_input_container">
        {weightData.length && weightData.length > 0 ? (
          <LineChart
            cowpig={weightData
              .map((d) =>
                d.name === "cowpig"
                  ? {
                      x: utils.getFormattedDateGraph(d.created_at),
                      y: d.weight,
                    }
                  : null
              )
              .filter((x) => x)
              .reverse()}
            bagel={weightData
              .map((d) =>
                d.name === "bagel"
                  ? {
                      x: utils.getFormattedDateGraph(d.created_at),
                      y: d.weight,
                    }
                  : null
              )
              .filter((x) => x)
              .reverse()}
          />
        ) : null}
        <DataInput user={user} fetchData={fetchData} />
      </div>
)

*/
