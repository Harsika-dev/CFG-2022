import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Card from "../card/card";
const DashBoard = () => {
  const [user] = useContext(UserContext);
  const [userlist, setUserlist] = useState(["admin", "user"]);

  // console.log(user.role)
  const run_list = () => {
    const list = userlist.map((item, i) => {
      return <Card username={item} />;
    });

    return (
      <div>
        <div className="row">{list}</div>
      </div>
    );
  };

  const request = (username) => {
    // send data to server
    console.log(username);
  };
  return user !== undefined ? (
    user.role == "admin" ? (
      <div>
        <h1>Admin DashBoard</h1>
        {run_list()}
      </div>
    ) : (
      <div>
        {" "}
        <Redirect to="/patientdashboard" />
      </div>
      // Main Application Goes here
    )
  ) : (
    <Redirect to="/signin" />
  );
};

export default DashBoard;
