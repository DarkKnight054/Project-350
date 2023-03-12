import React, { useState } from 'react';
import axios from '../../config/axiosConfig';
import './loginIndex.css';
import Footer from '../../components/Footer';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltOutlined from '@mui/icons-material/PersonAddAltOutlined';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
  // const [state, setState] = useState({ email: "", password: "" });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    org: '',
  });

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
    if (email.includes('jail'))
      setFormData({
        ...formData,
        org: 'jail',
      });
    else if (email.includes('police'))
      setFormData({
        ...formData,
        org: 'police',
      });
    else if (email.includes('passport'))
      setFormData({
        ...formData,
        org: 'passport',
      });

    console.log(email);
    if (email.includes('court')) {
      console.log('enter the court');
      axios
        .post('login/court', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          Cookies.set('email', formData.email);
          navigate('/dashboard', { state: { ...response.data, org: 'court' } });
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (
      email.includes('jail') ||
      email.includes('passport') ||
      email.includes('police')
    ) {
      axios
        .post('login/jail', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          Cookies.set('email', formData.email);
          if (email.includes('jail'))
            navigate('/dashboard', {
              state: { ...response.data, org: 'jail' },
            });
          else if (email.includes('passport'))
            navigate('/dashboard', {
              state: { ...response.data, org: 'passport' },
            });
          else if (email.includes('police'))
            navigate('/dashboard', {
              state: { ...response.data, org: 'police' },
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const navigate = useNavigate();
  const homeButton = async (event) => {
    event.preventDefault();
    navigate('/');
  };
  const logInButton = async (event) => {
    event.preventDefault();
    navigate('/login');
  };
  const registrationButton = async (event) => {
    event.preventDefault();
    navigate('/registration');
  };

  return (
    <div className="main">
      <div className="heading">
        <img
          src="/assets/homeScreen_logo.jpeg"
          className="app-logo"
          alt="appLogo"
        />
        <div className="heading-text">Jailor</div>
        <div style={{ width: '1200px' }} />
        <div className="heading-text" onClick={homeButton}>
          {<HomeOutlinedIcon />} Home
        </div>
        <div className="heading-text" onClick={logInButton}>
          {<LoginIcon />}Login
        </div>
        <div className="heading-text" onClick={registrationButton}>
          {<PersonAddAltOutlined />}Register
        </div>
      </div>
      <div className="login-App">
        <div className="login-Container">
          <h1 style={{ marginTop: '20px' }}>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  });
                }}
                value={formData.email}
                required
              />
              {/* {renderErrorMessage("uname")} */}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                type="password"
                name="password"
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
                value={formData.password}
                required
              />
              {/* {renderErrorMessage("pass")} */}
              <a href="/registration">Create a new account</a>
            </div>

            <button className="loginBut" type="submit">
              <p>Login</p>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
