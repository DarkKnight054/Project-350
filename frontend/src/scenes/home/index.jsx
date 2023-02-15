import React from "react";
import "./home.css";
const Home = () => {
  return (
    <div className="Home">
      <div className="Nav-bar">
        <img src='/assets/homeScreen_logo.jpeg' className="app-logo" alt='appLogo' />
        <div className="app-name">Jailor</div>
        <div className="login">Login</div>
        <div className="register">Register</div>
      </div>
      <div className="content1">
        <img src='/assets/homeScreen_image1.jpg' className="image1" alt='image1'/>
        <div className="text-content1">
          <h1
            style={{ fontSize: "50px", marginLeft: "5%", color: "yellowgreen" }}
          >
            What Is Jailor ?
          </h1>
          <p style={{ fontSize: "35px", marginLeft: "5%", marginRight: "5%" }}>
            A private blockchain-based distributed system where criminal records
            are held in a secure way. No one can manipulate these confidential
            data without any verified access. Government organizations can
            verify criminal identity of human beings according to their role in
            the system.{" "}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "50px" }}>
        <div style={{ width: "60%", margin: "10px" }}>
          <h1
            style={{
              marginLeft: "40%",
              marginTop: "100px",
              fontSize: "50px",
              fontFamily: "Cormorant Garamond, serif",
              color: "yellowgreen",
            }}
          >
            Why Jailor?
          </h1>
          <div className="text-content2">
            We've used private blockchain to build 'Jailor'. A private
            blockchain is a permissioned blockchain platform, where participants
            are known and trusted. It provides a means of securely recording
            transactions and maintaining a shared ledger across multiple
            organizations. Key benefits of the systems are - Security and
            Confidentiality,Interoperability,Scalability.
          </div>
        </div>
        <img src='/assets/homeScreen_image5.jpg' className="image5" alt='image5'/>
      </div>
      <div className="content2">
        <img src='/assets/homeScreen_image2.jpg' className="image2" alt='image2'/>
        <img src='/assets/homeScreen_image3.svg' className="image3" alt='image3'/>
        <img src='/assets/homeScreen_image4.jpeg' className="image4" alt='image4'/>
      </div>
      <div className="content3">
        <div style={{ marginLeft: "75px", width: "400px" }}>
          <div
            style={{ fontSize: "40px", color: "yellowgreen", margin: "20px" }}
          >
            How jailor works?
          </div>
          <div style={{ fontSize: "30px", marginTop: "-20px" }}>
            <ul>
              <li>A online criminal record management system</li>
              <li>Private blockchain-based distributed system</li>
              <li>Guarantee privacy and security</li>
            </ul>
          </div>
        </div>
        <div style={{ marginLeft: "200px", width: "450px" }}>
          <div
            style={{
              fontSize: "40px",
              color: "yellowgreen",
              marginTop: "20px",
            }}
          >
            Can verify criminal identity?
          </div>
          <div style={{ fontSize: "30px", marginTop: "-20px" }}>
            <ul>
              <li>
                Any govt. organization can verify the criminal identity of their
                customers who want to take their service.
              </li>
              <li>
                These organizations have specific permissions in the system.
              </li>
            </ul>
          </div>
        </div>
        <div style={{ marginLeft: "200px" }}>
          <div
            style={{
              fontSize: "40px",
              color: "yellowgreen",
              marginTop: "20px",
            }}
          >
            Can securely store criminal records?{" "}
          </div>
          <div style={{ fontSize: "30px", marginTop: "-20px" }}>
            <ul>
              <li>Unauthorized access to the system is denied.</li>
              <li>One cannot manipulate previous records.</li>
              <li>Recors can only be created, update and deleted by admins.</li>
              <li>Security and privacy of the data is main concern.</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="ending">
        <p>All copyrights reserved by ©Jailor</p>
      </footer>
    </div>
  );
};
export default Home;