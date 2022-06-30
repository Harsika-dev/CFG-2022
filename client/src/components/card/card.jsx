import React, { useState, useContext } from 'react';
// import { UserContext } from "../../UserContext";
const Card = ({username}) => {
  
  const Allow = () => {
       console.log(username)
      //  allow user to auth
  }
  return (
    <div>
         <li><h2>{username}</h2></li> 
         <button onClick={Allow}>Allow</button>    
    </div>
  );
};

export default Card;