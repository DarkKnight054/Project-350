import React, { useState } from "react";
import './loginIndex.css';
import Footer from "../../components/Footer";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltOutlined from "@mui/icons-material/PersonAddAltOutlined";
export default function Login({ onSubmit }) {
  // const [state, setState] = useState({ email: "", password: "" });

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
        <div className='heading-text'>{<HomeOutlinedIcon/>} Home</div>
        <div className='heading-text'>{<LoginIcon/>}Login</div>
        <div className='heading-text'>{< PersonAddAltOutlined />}Register</div>
      </div>
      <div className='login-App'>
        <div className='login-Container'>
          <h1 style={{ marginTop: "20px" }}>Sign In</h1>
          <div className='input-container'>
            <label>Username </label>
            <input type='text' name='uname' required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className='input-container'>
            <label>Password </label>
            <input type='password' name='pass' required />
            {/* {renderErrorMessage("pass")} */}
            <a href='/signup'>Create a new account</a>
          </div>

          <button className='loginBut'>
            <p>Login</p>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
