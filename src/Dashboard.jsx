import React, { useEffect, useState } from "react";
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

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [weightData, setWeightData] = useState([]);

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
    please
      .fetchDataByUser(user.displayName.split(" ").join(""))
      .then((data) => setWeightData(data.data))
      .catch((err) => console.log(err));
  }, [user, loading]);

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
