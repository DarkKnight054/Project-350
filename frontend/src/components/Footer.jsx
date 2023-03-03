import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Supreme Court of Bangladesh</h4>

            <ul>
              <li>
                <a href="https://bangladesh.gov.bd/index.php">
                  National Web portal
                </a>
              </li>
              <li>
                <a href="http://www.minlaw.gov.bd/">Ministry of law</a>
              </li>
              <li>
                <a href="http://bdlaws.minlaw.gov.bd/">BD Laws</a>
              </li>
              <li>
                <a href="https://www.judiciary.org.bd/">Judicial Portal</a>
              </li>
              <li>
                <a href="https://supremecourt.gov.bd/web/?page=legal_aid.php&menu=10&lang=">
                  Legal Aid
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Bangladesh Police</h4>
            <ul>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.ntitas.bdPoliceHelpLine&hl=en&pli=1">
                  Mobile Application
                </a>
              </li>
              <li>
                <a href="https://www.police.gov.bd/en/hot_line_number">
                  Hotline Number
                </a>
              </li>
              <li>
                <a href="https://pcc.police.gov.bd/ords/f?p=500:1::::::">
                  Online Police Clearence
                </a>
              </li>
              <li>
                <a href="https://www.police.gov.bd/en/press_release">
                  Press Release
                </a>
              </li>
              <li>
                <a href="https://www.police.gov.bd/en/legal_instruments">
                  Legal Helps
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Department of immigrations & passports</h4>
            <ul>
              <li>
                <a href="https://www.epassport.gov.bd/contact">Contact</a>
              </li>
              <li>
                <a href="https://www.epassport.gov.bd/landing">E-Passport</a>
              </li>
              <li>
                <a href="https://www.epassport.gov.bd/instructions/instructions">
                  Instructions
                </a>
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
            {/* <div className="social-links">
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
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
