import React from "react";
import "./Doctorpage.css";
import { useState, useEffect, useContext } from "react";
// import { appointments } from "../Scheduler/data";
import { UserContext } from "../../UserContext";

const Doctorpage = () => {
  const [appointment, setAppointment] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    async function getApps(id) {
      try {
        const response = await fetch(
          "http://localhost:8080/appointments/doctor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        setAppointment(data);
      } catch (err) {
        console.log(err);
      }
    }
    getApps(user?._id);
  });

  async function bookAppointment(id) {
    try {
      const response = await fetch("http://localhost:8080/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="column-flex-center doctor-container">
      <h2>Doctor's Dashboard</h2>
      {appointment.map((app) => {
        <div className="card">
          <div className="container">
            <h4>
              <b>{app.PatientId.name}</b>
            </h4>
            {/* <p>
              {" "}
              He is Dr. Arjun Reddy, topper of the class, topper of the
              university, excellent student!
            </p> */}
            <div align="center">
              <button
                type="button"
                className="button-accept"
                onClick={() => {
                  bookAppointment(user._id);
                }}
              >
                Book an appointment
              </button>
            </div>
          </div>
        </div>;
      })}
      <div className="card">
        <div className="container">
          <h4>
            <b>Dr. Arjun Reddy</b>
          </h4>
          <p>
            {" "}
            He is Dr. Arjun Reddy, topper of the class, topper of the
            university, excellent student!
          </p>
          <div align="center">
            <button type="button" className="button-accept">
              Book an appointment
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="container">
          <h4>
            <b>Dr. Arjun Reddy</b>
          </h4>
          <p>
            {" "}
            He is Dr. Arjun Reddy, topper of the class, topper of the
            university, excellent student!
          </p>
          <div align="center">
            <button type="button" className="button-accept">
              Book an appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctorpage;
