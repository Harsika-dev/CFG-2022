const Users = require("../Models/users.js");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

const Razorpay = require("razorpay");
const Post = require("../Models/Post");
const User = require("../Models/users");
const request = require("request");
const { Router } = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
dotenv.config();

const privateKey = process.env.PrivateKey;

const re =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Doctors = require("../Models/Doctor");
const Patients = require("../Models/Patient");
const Appointments = require("../Models/Appointment");

const allUsersRequested = async (req, res) => {
  try {
    const allUsers = await Users.find({ hasRequested: true });
    res.status(200).send(allUsers);
  } catch (er) {
    res.status(200).send("error");
  }
};

const updateAuthorization = async (req, res) => {
  const { username } = req.body;
  try {
    const updatedUser = await Users.updateOne(
      { username },
      { hasRequested: false, post1Auth: true },
      { new: true }
    );
    res.status(200).send({ message: "Allowed accessed" });
  } catch (e) {
    res.status(400).send("error");
  }
};

const askForAuth = async (req, res) => {
  try {
    const { username } = req.body;
    const updatedUser = Users.findOneAndUpdate(
      { username },
      { hasRequested: true },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Asked for accessed", user: { updatedUser } });
  } catch (e) {
    res.status(400).send("error");
  }
};
const createpost = async (req, res) => {
  // const role = req.body.role
  // if(role === 'user')
  //     return res.status(400).json({user : "unauthorized user"})

  await Post.findOne({ title: req.body.title })
    .then((post) => {
      if (post) {
        return res
          .status(400)
          .json({ title: "Post with same title already exists" });
      } else {
        const newPost = new Post(req.body);

        newPost
          .save()
          .then((post) => {
            res.json(post);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ server: "internal server error" });
    });
};

const viewpost = async (req, res) => {
  try {
    const posts = await Post.find({ status: "verified" });
    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const registerUser = (req, res) => {
  // const userCredentials = {
  //   email: req.body.email,
  //   password: req.body.password,
  //   role: req.body.role,
  // };

  // const { repassword } = req.body;

  // if (userCredentials.password !== repassword) {
  //   return res.status(401).json({ message: "Password doesn't match" });
  // }

  if (!re.test(req.body.email)) {
    return res.status(401).json({ message: "Invalid Email" });
  }

  const user = new Users(req.body);

  user.save((err, user_) => {
    if (err) {
      if (err.code == 11000) {
        return res.status(401).json({ message: "Credentials already exist" });
      }
      return res.status(404).json({ message: "Bad Request" });
    }

    const token = jwt.sign(
      { id: user_.id, username: user_.username, role: user_.role },
      privateKey,
      { expiresIn: 1200 }
    );

    return res.status(201).json({
      message: "Success",
      token: token,
      username: user_.username,
      role: user_.role,
    });
  });
};

const authenticateUser = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  Users.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ message: "Bad Request" });
      }

      if (!isMatch) {
        return res.status(401).json({
          message: "Authentication Failed : Password email doesn't match ",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          role: user.role,
        },
        privateKey,
        { expiresIn: 60 }
      );

      return res.status(200).json({
        message: "Success",
        token: token,
        username: user.username,
        role: user.role,
      });
    });
  });
};

const authenticatePatient = (req, res) => {
  const { email, password } = req.body;

  Patients.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // user.comparePassword(password, (err, isMatch) => {
    // if (err) {
    //   return res.status(400).json({ message: "Bad Request" });
    // }

    // if (!isMatch) {
    //   return res.status(401).json({
    //     message: "Authentication Failed : Password Username doesn't match ",
    //   });
    // }

    // const token = jwt.sign(
    //   {
    //     id: user._id,
    //     email: user.email,
    //     role: user.role,
    //   },
    //   privateKey,
    //   { expiresIn: 60 }
    // );

    // return res.status(200).json({
    //   message: "Success",
    //   token: token,
    //   email: user.email,
    //   role: user.role,
    // });
    // });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      privateKey,
      { expiresIn: 60 }
    );

    return res.status(200).json({
      message: "Success",
      token: token,
      email: user.email,
      role: user.role,
    });
  });
};

const authenticateDoctors = (req, res) => {
  const { email, password } = req.body;

  Doctors.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(400).json({ message: "Bad Request" });
      }

      if (!isMatch) {
        return res.status(401).json({
          message: "Authentication Failed : Password Username doesn't match ",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        privateKey,
        { expiresIn: 60 }
      );

      return res.status(200).json({
        message: "Success",
        token: token,
        email: user.email,
        role: user.role,
      });
    });
  });
};

const registerUser1 = async (req, res) => {
  const userCredentials = req.body;
  console.log(req.body);
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  if (!re.test(userCredentials.email)) {
    return res.status(401).json({ message: "Invalid Email" });
  }
  if (userCredentials.role === "doctor") {
    const doctor = new Doctors({
      ...userCredentials,
      password: hashedPassword,
    });

    doctor.save((err, user_) => {
      if (err) {
        if (err.code == 11000) {
          return res.status(401).json({ message: "Credentials already exist" });
        }
        return res.status(404).json({ message: "Bad Request" });
      }

      const token = jwt.sign(
        { id: user_.id, email: user_.email, role: user_.role },
        privateKey,
        { expiresIn: 1200 }
      );

      return res.status(201).json({
        message: "Success",
        token: token,
        email: user_.email,
        role: user_.role,
      });
    });
  } else {
    const Patient = new Patients(userCredentials);

    Patient.save((err, user_) => {
      if (err) {
        if (err.code == 11000) {
          return res.status(401).json({ message: "Credentials already exist" });
        }
        return res.status(404).json({ message: "Bad Request" });
      }

      const token = jwt.sign(
        { id: user_.id, email: user_.email, role: user_.role },
        privateKey,
        { expiresIn: 1200 }
      );

      return res.status(201).json({
        message: "Success",
        token: token,
        email: user_.email,
        role: user_.role,
      });
    });
  }
  const user = new Users(userCredentials);
};

async function acceptDoctor(req, res) {
  // send id of doctor to be accepted in body
  const { id } = req.body;
  try {
    const doctor = await Doctors.findOneAndUpdate(
      { _id: id },
      { hasRequested: false, verified: true }
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function rejectDoctor(req, res) {
  // send id of doctor to be rejected in body
  const { id } = req.body;
  try {
    const doctor = await Doctors.findOneAndUpdate(
      { _id: id },
      { hasRequested: false, verified: false }
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function showAllAcceptedDoctors(req, res) {
  try {
    const allAcceptedDoctors = await Doctors.find({ verified: true });
    res.status(200).send(allAcceptedDoctors);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function showAllVerificationPendingDoctors(req, res) {
  try {
    const allRejectedDoctors = await Doctors.find({ hasRequested: true });
    res.status(200).send(allRejectedDoctors);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function showAllPatients(req, res) {
  try {
    const allPatients = await Patients.find({});
    res.status(200).send(allPatients);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}
const orders = async (req, res) => {

  try {
    const instance = new Razorpay({
      key_id: process.env.razorpayIdKey,
      key_secret: process.env.razorpaySecretKey,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const verify = async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
};

async function addAppointment(req, res) {
  try {
    const { patientId, doctorId, date, startHour, endHour } = req.body;
    console.log(req.body);
    const addedAppointment = await Appointments.create(req.body);
    res.status(200).send(addedAppointment);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function showPendingRequestForAppointment(req, res) {
  try {
    const allPendingAppointments = await Appointments.find({
      Accepted: false,
      checked: false,
    });
    console.log("show: ", allPendingAppointments);
    res.status(200).send(allPendingAppointments);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function showAllUpcomingAppointments(req, res) {
  try {
    const allUpcomingAppointments = await Appointments.find({
      Accepted: true,
      Status: false,
      checked: true,
    });
    res.status(200).send(allUpcomingAppointments);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

async function acceptAppointment(req, res) {
  try {
    const appointment = await Appointments.findOneAndUpdate(
      { _id: req.body.id },
      { Accepted: true, checked: true },
      { new: true }
    );
    res.status(200).send(appointment);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}
// Appointments for a particular doctor
async function doctorsAppointments(req, res) {
  try {
    console.log(req.body.id);
    const appointments = await Appointments.find({
      DoctorId: req.body.id,
    }).populate("PatientId");
    res.status(200).send(appointments);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

const func = () => {
  console.log(privateKey);
};

module.exports = {
  authenticatePatient: authenticatePatient,
  registerUser: registerUser,
  authenticateUser: authenticateUser,
  func: func,
  updateAuthorization: updateAuthorization,
  askForAuth: askForAuth,
  allUsersRequested: allUsersRequested,
  createpost: createpost,
  viewpost: viewpost,
  registerUser1,
  orders: orders,
  verify:verify,
  acceptDoctor,
  rejectDoctor,
  showAllAcceptedDoctors,
  showAllVerificationPendingDoctors,
  showAllPatients,
  addAppointment,
  showAllUpcomingAppointments,
  acceptAppointment,
  showPendingRequestForAppointment,
  doctorsAppointments,
};
