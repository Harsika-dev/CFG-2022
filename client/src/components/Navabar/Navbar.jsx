import React, { useContext } from "react";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./style";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { UserContext } from "../../UserContext";
import axios from "axios";
const Navbar = () => {
  const [user] = useContext(UserContext);

  const classes = useStyles();
  const [book, setBook] = React.useState({
    name: "The Fault In Our Stars",
    author: "John Green",
    img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    price: 250,
  });
  const initPayment = (data) => {
    const options = {
      key: process.env.razorpayIdKey,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/verify";
          const { data } = await axios.post(verifyUrl, response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/orders";
      const { data } = await axios.post(orderUrl, { amount: book.price });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} color="primary">
        <Toolbar>
          <Typography variant="h4" className={classes.font}>
            Taru Foundation
          </Typography>
        </Toolbar>
        {user !== undefined ? (
          <Logout className={classes.right}></Logout>
        ) : (
          <span className={classes.right}>
            <Button component={Link} to="/signin" color="inherit">
              Sign In
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
            <Button component={Link} to="/contact" color="inherit">
              Contact us
            </Button>
            <Button onClick={handlePayment} color="inherit">
              Donate
            </Button>
          </span>
        )}
      </AppBar>
    </div>
  );
};

export default Navbar;
