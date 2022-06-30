import React from "react";

import { Typography, Button } from "@material-ui/core";

import { Link } from "react-router-dom";

const Wait = () => {
  return (
    <div style={{ margin: "80px" }}>
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        color="textSecondary"
      >
        Wait Admin hasnt verified your account yet
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        <Button color="primary" size="large" component={Link} to="/">
          Back To Home
        </Button>
      </Typography>
    </div>
  );
};

export default Wait;
