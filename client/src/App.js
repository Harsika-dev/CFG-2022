import React from "react";
import SignIn from "./components/SignIn/SignIn";
import Navbar from "./components/Navabar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import DashBoard from "./components/DashBoard/DashBoard";
import Welcome from "./components/Welcome/Welcome.jsx";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./UserContext";
import Createpost from "./components/Createpost/Createpost";
import DoctorDashboard from "./components/DoctorPage/Doctorpage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import PatientDashboard from "./components/PatientPage/Patientpage";
import Contact from "./components/Contact/Contact";
import SchedulerShow from "./components/Scheduler/Scheduler";
// import Viewpost from "./components/Viewpost/Viewpost";
import Wait from "./components/waiting/Wait";
const App = () => {
  return (
    <UserProvider>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/createpost" component={Createpost} />
        <Route exact path="/doctordashboard" component={DoctorDashboard} />
        <Route exact path="/patientdashboard" component={PatientDashboard} />
        <Route exact path="/admindashboard" component={AdminDashboard} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/scheduler" component={SchedulerShow} />
        {/* <Route exact path="/waiting" component={Wait} /> */}
        {/* <Route exact path="/viewpost" component={Viewpost} /> */}
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </UserProvider>
  );
};

export default App;
