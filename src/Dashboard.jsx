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
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [weightData, setWeightData] = useState([]);
  const [petList, setPetList] = useState([]);
  const [petData, setPetData] = useState([]);

  // const dataRef = useRef();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
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
    console.log("auth effect called");

    // please
    //   .fetchDataByUser(
    //     user.displayName ? user.displayName.split(" ").join("") : "anon"
    //   )
    //   .then((res) => {
    //     //gets unique pet values from weight data
    //     let pets = [...new Set(res.data.map((el) => el.name))];

    //     //get {x,y} values for line graph by pet
    //     let d1 = utils.getLineGraphValues(petList, weightData, 0);
    //     let d2 = utils.getLineGraphValues(petList, weightData, 1);
    //     let d3 = utils.getLineGraphValues(petList, weightData, 2);
    //     let d4 = utils.getLineGraphValues(petList, weightData, 3);
    //     let d5 = utils.getLineGraphValues(petList, weightData, 4);

    //     let fullSet = [d1, d2, d3, d4, d5];
    //     //prune and format arry to be what chart.js expects
    //     let prunedData = fullSet
    //       .map((d) => (d.length > 0 ? d : null))
    //       .filter((x) => x)
    //       .map((d, i) => {
    //         return { label: pets[i], data: d };
    //       });

    //     // let graphDataObj = prunedData.map((d, i) => {
    //     //   return { label: pets[i], data: d };
    //     // });
    //     console.warn(prunedData);
    //     // dataRef.data = graphDataObj;
    //     setPetData(prunedData);
    //     setPetList(pets);
    //     setWeightData(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, [user, loading]);

  useEffect(() => {
    if (!user) return navigate("/");
    please
      .fetchDataByUser(
        user.displayName ? user.displayName.split(" ").join("") : "anon"
      )
      .then((res) => {
        //gets unique pet values from weight data
        let pets = [...new Set(res.data.map((el) => el.name))];

        //get {x,y} values for line graph by pet
        // let d1 = utils.getLineGraphValues(petList, weightData, 0);
        // let d2 = utils.getLineGraphValues(petList, weightData, 1);
        // let d3 = utils.getLineGraphValues(petList, weightData, 2);
        // let d4 = utils.getLineGraphValues(petList, weightData, 3);
        // let d5 = utils.getLineGraphValues(petList, weightData, 4);

        // let fullSet = [d1, d2, d3, d4, d5];
        // //prune and format arry to be what chart.js expects
        // let prunedData = fullSet
        //   .map((d) => (d.length > 0 ? d : null))
        //   .filter((x) => x)
        //   .map((d, i) => {
        //     return { label: pets[i], data: d };
        //   });

        // let graphDataObj = prunedData.map((d, i) => {
        //   return { label: pets[i], data: d };
        // });
        // dataRef.data = graphDataObj;
        // setPetData(prunedData);
        // console.warn(prunedData, petData);
        setPetList(pets);
        setWeightData(res.data);
        //   console.log("nomral effect called");
        //   return prunedData;
        // })
        // .then((data) => {
        //   console.log("/////", data);
        //   setPetData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let d1 = utils.getLineGraphValues(petList, weightData, 0);
    let d2 = utils.getLineGraphValues(petList, weightData, 1);
    let d3 = utils.getLineGraphValues(petList, weightData, 2);
    let d4 = utils.getLineGraphValues(petList, weightData, 3);
    let d5 = utils.getLineGraphValues(petList, weightData, 4);

    let fullSet = [d1, d2, d3, d4, d5];
    //prune and format arry to be what chart.js expects
    let prunedData = fullSet
      .map((d) => (d.length > 0 ? d : null))
      .filter((x) => x)
      .map((d, i) => {
        return { label: petList[i], data: d };
      });

    setPetData(prunedData);
  }, [petList, weightData]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
      <DataList data={weightData} user={user} fetchData={please.fetchData} />
      <div className="graph_input_container">
        {weightData.length && weightData.length > 0 ? (
          <LineChart pets={petList} data={petData} />
        ) : null}
        <DataInput user={user} fetchData={please.fetchData} />
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
