import React from 'react';
import './home.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltOutlined from '@mui/icons-material/PersonAddAltOutlined';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
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
    <div className="Home">
      <div className="heading">
        <img
          src="/assets/homeScreen_logo.jpeg"
          className="app-logo"
          alt="appLogo"
        />
        <div className="home-heading-text">CRMS</div>
        <div style={{ width: '1200px' }} />
        <div className="home-heading-text" onClick={homeButton}>
          {<HomeOutlinedIcon />} Home
        </div>
        <div className="home-heading-text" onClick={logInButton}>
          {<LoginIcon />}Login
        </div>
        <div className="home-heading-text" onClick={registrationButton}>
          {<PersonAddAltOutlined />}Register
        </div>
      </div>
      <div className="middleware">
        <h1>Criminal Record Management System</h1>
        <div className="content-1">
          <h2>
            Jailor, a web application designed to manage criminal information
            using permissioned blockchain technology.
            <span>
              <br />
            </span>
            Jailor provides a secure and reliable platform for storing and
            managing criminal records, ensuring that sensitive information is
            protected and only accessible by authorized parties.
          </h2>
          <img src="/assets/homeScreen_image1.jpg" />
        </div>
        <div className="content-2">
          <ol>
            <li>Court Authority</li>
            <li>Create & Delete Criminal Identity</li>
            <li>Administrator of the network</li>
          </ol>
          <img src="/assets/homeScreen_image2.jpg" />
          <div className="vertical-line"></div>
          <ol>
            <li>Police Authority</li>
            <li>Check Criminal Data</li>
            <li>Participant of the network</li>
          </ol>
          <img src="/assets/homeScreen_logo.jpeg" />
          <div className="vertical-line"></div>
          <ol>
            <li>Govt{'.'} Authentication Organaization</li>
            <li>Identify Criminal Identity</li>
            <li>Participant of the network</li>
          </ol>
          <img src="/assets/homeScreen_image3.jpg" />
        </div>
        <div className="content-3">
          <ul>
            <li>
              <span>
                <i class="fas fa-hand-point-right"></i>
              </span>{' '}
              Security & Privacy is the main precedence
            </li>
            <li>
              <span>
                <i class="fas fa-hand-point-right"></i>
              </span>
              Confidentiality is maintained
            </li>
            <li>
              <span>
                <i class="fas fa-hand-point-right"></i>
              </span>
              Participants are authorized
            </li>
            <li>
              <span>
                <i class="fas fa-hand-point-right"></i>
              </span>
              Roles have been assigned to participants
            </li>
          </ul>
          <img src="/assets/homeScreen_image4.jpg" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
