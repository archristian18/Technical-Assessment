
import React from 'react';

function Footer() {

      return (
        <footer id="footer" className="footer" >
        
        {/* ======= Footer ======= */}
            <div className="footer-content">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-5 col-md-12 footer-info">
                  <h4>Contact Us</h4>
                  <strong>Phone:</strong> +1 5589 55488 55<br />
                  <strong>Email:</strong> info@example.com<br />
                  </div>
                  <div className="col-lg-2 col-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      {/* <li><i className="bi bi-dash" /> <a href="#">Home</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">About us</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Services</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Terms of service</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Privacy policy</a></li> */}
                    </ul>
                  </div>
                  <div className="col-lg-2 col-6 footer-links">
                    <h4>Our Services</h4>
                    <ul>
                      {/* <li><i className="bi bi-dash" /> <a href="#">Web Design</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Web Development</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Product Management</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Marketing</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Graphic Design</a></li> */}
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                    <h4>Locate Us</h4>
                    <p>
                      A108 Adam Street <br />
                      New York, NY 535022<br />
                      United States <br /><br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-legal">
              <div className="container">
                <div className="copyright">
                  © Copyright <strong><span>Archristian</span></strong>. All Rights Reserved
                </div>

              </div>
            </div>
            {/* End Footer */}

        </footer>
       
        );
      
    }
  
    export default Footer;