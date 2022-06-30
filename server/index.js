const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const dbConnector = require("./connection.js");
const routes = require("./Routes/routes.js");

const registerRouter = require("./Router/auth.js");
const doctorRouter = require("./Router/doctor.router.js");
const adminRouter = require("./Router/Admin.js");
const appointmentsRouter = require("./Router/Appointments.js");

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const morgan = require("morgan");
const controllers = require("./Controllers/controllers.js");


app.use(express.json({ limit: "16mb" }));

app.use(express.urlencoded({ extended: true, limit: "16mb" }));

app.use(cors());

app.use(morgan("dev"));

app.post("/orders",controllers.orders);

app.post("/verify",controllers.verify);

// app.use("/", routes);
app.use("/auth/v2", registerRouter);
app.use("/doctor", doctorRouter);
app.use("/admin", adminRouter);
app.use("/appointments", appointmentsRouter);

dbConnector();

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
