import React, { useEffect, useState } from 'react';
import './registrationIndex.css';
import Footer from '../../components/Footer';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltOutlined from '@mui/icons-material/PersonAddAltOutlined';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    person: '',
    location: '',
    password: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email;
    console.log(email);

    if (email.includes('@court.org.bd')) {
      console.log('enter the court');
      const data = {
        courtId: formData.email,
        location: formData.location,
        judgeSign: formData.person,
        password: formData.password,
      };

      axios
        .post('admin/courtentry', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (
      email.includes('jail') ||
      email.includes('police') ||
      email.includes('passport')
    ) {
      let org = '';
      if (email.includes('jail')) org = 'jail';
      else if (email.includes('police')) org = 'police';
      else if (email.includes('passport')) org = 'passport';
      const data = {
        org: org,
        jailId: formData.email,
        location: formData.location,
        dSign: formData.person,
        password: formData.password,
      };

      axios
        .post('admin/jailentry', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          Cookies.set('email', formData.email);

          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
      <div className="App">
        <div className="loginContainer">
          <h1 style={{ marginTop: '20px' }}>Create An Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                name="emailId"
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                value={formData.email}
                required
              />
            </div>
            <div className="input-container">
              <label>Judge/Jailor </label>
              <input
                type="text"
                name="judge"
                onChange={(event) =>
                  setFormData({ ...formData, person: event.target.value })
                }
                value={formData.person}
                required
              />
              <label>Location </label>
              <input
                type="text"
                name="location"
                onChange={(event) =>
                  setFormData({ ...formData, location: event.target.value })
                }
                value={formData.location}
                required
              />
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
              <a href="/login">Already have an account ? Sign In</a>
            </div>

            <button className="loginBut" type="submit">
              <p>Sign Up</p>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
