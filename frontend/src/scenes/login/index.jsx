import React, { useState } from "react";
import axios from "axios";
import "./loginIndex.css";
import Footer from "../../components/Footer";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltOutlined from "@mui/icons-material/PersonAddAltOutlined";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const homeButton = async (event) => {
    event.preventDefault();
    navigate("/");
  };
  const logInButton = async (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const registrationButton = async (event) => {
    event.preventDefault();
    navigate("/registration");
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.email]: e.target.value,
  //     [e.target.password]: e.target.value,
  //   });
  // };

  console.log(`email: ${formData.email}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    console.log(email);
    if (email.includes("court")) {
      console.log("enter the court");
      axios
        .post("http://localhost:3001/login/court", formData)
        .then((response) => {
          console.log(response.data.CourtId);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (email.includes("jail")) {
      axios
        .post("http://localhost:3001/login/jail", formData)
        .then((resposnse) => {
          console.log(resposnse.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className='main'>
      <div className='heading'>
        <img
          src='/assets/homeScreen_logo.jpeg'
          className='app-logo'
          alt='appLogo'
        />
        <div className='heading-text'>Jailor</div>
        <div style={{ width: "1200px" }} />
        <div className='heading-text' onClick={homeButton}>
          {<HomeOutlinedIcon />} Home
        </div>
        <div className='heading-text' onClick={logInButton}>
          {<LoginIcon />}Login
        </div>
        <div className='heading-text' onClick={registrationButton}>
          {<PersonAddAltOutlined />}Register
        </div>
      </div>
      <div className='login-App'>
        <div className='login-Container'>
          <h1 style={{ marginTop: "20px" }}>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <label>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                value={formData.email}
                required
              />
              {/* {renderErrorMessage("uname")} */}
            </div>
            <div className='input-container'>
              <label>Password </label>
              <input
                type='password'
                name='password'
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
                value={formData.password}
                required
              />
              {/* {renderErrorMessage("pass")} */}
              <a href='/signup'>Create a new account</a>
            </div>

            <button className='loginBut' type='submit'>
              <p>Login</p>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
