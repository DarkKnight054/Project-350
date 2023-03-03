import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Bangladesh Police</h4>

            <ul>
              <li>
                <a href="#">Online Store</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Breadscription</a>
              </li>
              <li>
                <a href="#">Wholesale</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>HELPFUL STUFF</h4>
            <ul>
              <li>
                <a href="#">Recipes</a>
              </li>
              <li>
                <a href="#">Easy Peasy Flour Mix Recipes</a>
              </li>
              <li>
                <a href="#">Recycling Info</a>
              </li>
              <li>
                <a href="#">Food Safety Standards</a>
              </li>
              <li>
                <a href="#">E-book</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>QUESTIONS?</h4>
            <ul>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Find a Store</a>
              </li>
              <li>
                <a href="#">Store Request form</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>GET E-NEWS</h4>
            <div>They're helpful and funny (sometimes, we try)!</div>
            <div style={{ display: 'flex', marginTop: '20px', height: '40px' }}>
              <div className="inputBox">
                <input
                  type="email"
                  required="required"
                  style={{ height: '40px' }}
                />
                <span>Enter Email ID</span>
              </div>
              <button
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                SIGN UP
              </button>
            </div>
            <div className="social-links">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
