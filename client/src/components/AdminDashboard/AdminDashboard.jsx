import React from "react";
import "./AdminDashboard.css";
import axios from "axios";
const AdminDashboard = () => {
  const [doctors, setDoctors] = React.useState([]);
  React.useEffect(async () => {
    const getfetch = () => {
      axios
        .get("http://localhost:8080/admin/doctorsToVerify/")
        .then((response) => {
          console.log(response);
          setDoctors(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getfetch();
  }, []);

  async function acceptDoctor(id) {
    try {
      const response = await fetch("http://localhost:8080/admin/acceptDoctor", {
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

  async function acceptDoctor(id) {
    try {
      const response = await fetch("http://localhost:8080/admin/acceptDoctor", {
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

  async function rejectDoctor(id) {
    try {
      const response = await fetch("http://localhost:8080/admin/rejectDoctor", {
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
      <div className="column-flex-center doctor-content">
        <h2>Admin's Dashboard</h2>

        {doctors?.map((doctor) => {
          return (
            <div className="card" style={{ width: "100%" }}>
              <div className="container">
                <h4>
                  <b>{doctor.name}</b>
                </h4>
                <p>
                  {" "}
                  Dr. {doctor.name} from {doctor.city}
                </p>
                <div align="center">
                  <button
                    type="button"
                    className="button-accept"
                    onClick={() => {
                      acceptDoctor(doctor._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="button-decline"
                    onClick={() => {
                      rejectDoctor(doctor._id);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>

            // <div className="column-flex-center doctor-accepted-cards">
            //   <div className="column-flex-center">
            //     <h3>{doctor.name}</h3>
            //     <div>
            //       Dr. {doctor.name} from {doctor.city},
            //     </div>
            //   </div>
            //   <button
            //     type="button"
            //     // onClick={() => {
            //     //   addAppointment(doctor._id);
            //     // }}
            //   >
            //     {" "}
            //     Decline
            //   </button>

            //   <button
            //     type="button"
            //     // onClick={() => {
            //     //   addAppointment(doctor._id);
            //     // }}
            //   >
            //     Accept
            //   </button>
            // </div>
          );
        })}
        {/* <div className="column-flex-center doctor-cards-container">
          <div className="column-flex-center doctor-accepted-card-container">
            <div className="column-flex-center doctor-accepted-cards">
              <div className="column-flex-center">
                <h3>Dr. Arjun Reddy</h3>
                <div>
                  He is Dr. Arjun Reddy, topper of the class, topper of the university, excellent student!
                </div>
              </div>
              <button type='button'>Book an appointment</button>
            </div><div className="column-flex-center doctor-accepted-cards">
              <div className="column-flex-center">
                <h3>Dr. Arjun Reddy</h3>
                <div>
                  He is Dr. Arjun Reddy, topper of the class, topper of the university, excellent student!
                </div>
              </div>
              <button type='button'>Book an appointment</button>
            </div><div className="column-flex-center doctor-accepted-cards">
              <div className="column-flex-center">
                <h3>Dr. Arjun Reddy</h3>
                <div>
                  He is Dr. Arjun Reddy, topper of the class, topper of the university, excellent student!
                </div>
              </div>
              <button type='button'>Book an appointment</button>
            </div>
          </div>
          <div className="column-flex-center doctor-accepted-cards-container">
            <div className="column-flex-center doctor-requested-cards">
              <div className="column-flex-center">
                <h3>Dr. Arjun Reddy</h3>
                <div>
                  He is Dr. Arjun Reddy, topper of the class, topper of the university, excellent student!
                </div>
              </div>
              <button type='button' className='doctor-accept' >Accept</button>
              <button type='button' className='doctor-reject' >Reject</button>
            </div><div className="column-flex-center doctor-requested-cards">
              <div className="column-flex-center">
                <h3>Dr. Arjun Reddy</h3>
                <div>
                  He is Dr. Arjun Reddy, topper of the class, topper of the university, excellent student!
                </div>
              </div>
              <button type='button' className='doctor-accept' >Accept</button>
              <button type='button' className='doctor-reject' >Reject</button>
            </div><div className="column-flex-center doctor-requested-cards">
              <div className="column-flex-center">
                <h3>Dr. Arjun Reddy</h3>
                <div>
                  He is Dr. Arjun Reddy, topper of the class, topper of the university, excellent student!
                </div>
              </div>
              <button type='button' className='doctor-accept' >Accept</button>
              <button type='button' className='doctor-reject' >Reject</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
