import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { appointments } from "./data";

// const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

function SchedulerShow() {
  // const [appointments, setappointments] = React.useState([]);
  // React.useEffect(async () => {
  //   const getfetch = async () => {
  //     await fetch("http://localhost:8080/appointments")
  //       .then((response) => setappointments(response.data))
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   getfetch();
  //   console.log(appointments);
  // }, []);

  return (
    <MuiThemeProvider>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState currentDate="2018-06-28" />
          <WeekView startDayHour={9} endDayHour={17} />
          <Appointments />
        </Scheduler>
      </Paper>
    </MuiThemeProvider>
  );
}

export default SchedulerShow;
