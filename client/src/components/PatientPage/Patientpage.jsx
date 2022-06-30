import React from "react";
import "./Patientpage.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Patientpage = () => {
  const [doctors, setDoctors] = useState([]);
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getAllDocs() {
      const response = await fetch(
        "http://localhost:8080/admin/allAcceptedDoctors"
      );
      const data = await response.json();
      setDoctors(data);
    }
    getAllDocs();
  }, []);

  async function addAppointment(Docid) {
    try {
      const response = await fetch("http://localhost:8080/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DoctorId: Docid,
          Day: day,
          startHour: startTime,
          endHour: endTime,
          PatientId: "62b770ae081499fa3c14ef0b",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="column-flex-center patient-container">
      {/* <div className="navbar-space">Navbar goes here!</div>  */}
      <div className="column-flex-center patient-content">
        <h2
          style={{
            color: "Black",
            fontWeight: "900",
            fontSize: "50px",
            marginBottom: "20px",
          }}
        >
          Patient's Dashboard
        </h2>
        <div className="column-flex-center doctor-cards-container">
          {doctors.map((doctor) => {
            return (
              // <Link to="/scheduler" style={{ textDecoration: "none" }}>
              <div className="column-flex-center doctor-cards">
                <div className="column-flex-center">
                  <h7 style={{ margin: "0px 20px" }}>{doctor.name}</h7>
                  <div>
                    Dr. {doctor.name} from {doctor.city},
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addAppointment(doctor._id);
                  }}
                  style={{ width: "30%" }}
                >
                  Book an appointment
                </button>
                <div className="days-flex">
                  Day:{" "}
                  <input
                    type="date"
                    onChange={(e) => {
                      setDay(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                  <br />
                  Start Time:{" "}
                  <input
                    type="time"
                    onChange={(e) => {
                      let curTime = e.target.value;
                      let timeArr = curTime.split(":");
                      setStartTime(timeArr[0]);
                      console.log(timeArr[0]);
                    }}
                  />
                  <br />
                  End Time:{" "}
                  <input
                    type="time"
                    onChange={(e) => {
                      let curTime = e.target.value;
                      let timeArr = curTime.split(":");
                      setEndTime(timeArr[0]);
                      console.log(timeArr[0]);
                    }}
                  />
                </div>
              </div>
              // </Link>
            );
          })}
          {/* <div className="column-flex-center doctor-cards">
            <div className="column-flex-center">
              <h3>Dr. Arjun Reddy</h3>
              <div className="doctor-cards-description">
                He is Dr. Arjun Reddy, topper of the class, topper of the
                university, excellent student!
              </div>
            </div>
            <button type="button">Book an appointment</button>
          </div>
          <div className="column-flex-center doctor-cards">
            <div className="column-flex-center">
              <h3>Dr. Arjun Reddy</h3>
              <div className="doctor-cards-description">
                He is Dr. Arjun Reddy, topper of the class, topper of the
                university, excellent student!
              </div>
            </div>
            <button type="button">Book an appointment</button>
          </div>
          <div className="column-flex-center doctor-cards">
            <div className="column-flex-center">
              <h3>Dr. Arjun Reddy</h3>
              <div className="doctor-cards-description">
                He is Dr. Arjun Reddy, topper of the class, topper of the
                university, excellent student!
              </div>
            </div>
            <button type="button">Book an appointment</button>
          </div>
          <div className="column-flex-center doctor-cards">
            <div className="column-flex-center">
              <h3>Dr. Arjun Reddy</h3>
              <div className="doctor-cards-description">
                He is Dr. Arjun Reddy, topper of the class, topper of the
                university, excellent student!
              </div>
            </div>
            <button type="button">Book an appointment</button>
          </div>
          <div className="column-flex-center doctor-cards">
            <div className="column-flex-center">
              <h3>Dr. Arjun Reddy</h3>
              <div className="doctor-cards-description">
                He is Dr. Arjun Reddy, topper of the class, topper of the
                university, excellent student!
              </div>
            </div>
            <button type="button">Book an appointment</button>
          </div>
          <div className="column-flex-center doctor-cards">
            <div className="column-flex-center">
              <h3>Dr. Arjun Reddy</h3>
              <div className="doctor-cards-description">
                He is Dr. Arjun Reddy, topper of the class, topper of the
                university, excellent student!
              </div>
            </div>
            <button type="button">Book an appointment</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Patientpage;
