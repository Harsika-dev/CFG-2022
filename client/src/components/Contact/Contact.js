import React from "react";
import './Contact.css'
const Contact = () => {

     const PopUp = () =>{
           alert("Your Contact has been sent Successfully")
     }
       return(
          <div className="container">
            <div className="content">
              <div className="left-side">
                <div className="address details">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="topic">Address</div>
                  <div className="text-one">MIG-1-100 Sada Colony, </div>
                  <div className="text-two">Jamnipali, Korba - 495450</div>
                </div>
                <div className="phone details">
                  <i className="fas fa-phone-alt"></i>
                  <div className="topic">Phone</div>
                  <div className="text-one">+91 70677194742</div>
                </div>
                <div className="email details">
                  <i className="fas fa-envelope"></i>
                  <div className="topic">Email</div>
                  <div className="text-one">support@tarufoundation.com</div>
                </div>
              </div>
              <div className="right-side">
                <div className="topic-text">Send us a message</div>
                <p>If you have any queries, please list down here</p>
              <form action="#">
                <div className="input-box">
                  <input type="text" placeholder="Enter your name"/>
                </div>
                <div className="input-box">
                  <input type="text" placeholder="Enter your email"/>
                </div>
                <div className="input-box message-box">
                  <textarea placeholder="Enter your message"></textarea>
                </div>
                <div className="button">
                  <input type="button" onClick={PopUp} value="Send Now"/ >
                </div>
              </form>
            </div>
            </div>
          </div>
       )
}

export default Contact

