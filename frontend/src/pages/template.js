
import React from 'react';

function Homepage() {

      return (
        <div >
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <title>Nova Bootstrap Template - Blog</title>
          <meta content name="description" />
          <meta content name="keywords" />
   

          <header id="header" className="header d-flex align-items-center fixed-top">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
              <a href="index.html" className="logo d-flex align-items-center">
                {/* Uncomment the line below if you also wish to use an image logo */}
                {/* <img src="assets/img/logo.png" alt=""> */}
                <h1 className="d-flex align-items-center">Auhtor1</h1>
              </a>
              <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
              <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
              <nav id="navbar" className="navbar">
                <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><a href="about.html">My Post</a></li>
                  <li><a href="team.html">Add Post</a></li>
                  <li><a href="blog.html" className="active">Logout</a></li>
                </ul>
              </nav>{/* .navbar */}
            </div>
          </header>{/* End Header */}

          
          <main id="main">
            {/* ======= Breadcrumbs ======= */}
            <div className="breadcrumbs d-flex align-items-center"  style={{backgroundImage: 'url("../../assets/img/blog-header.jpg")'}} >
              <div className="container position-relative d-flex flex-column align-items-center">
                <h2>Welcome Author1</h2>
              </div>
            </div>{/* End Breadcrumbs */}
            {/* ======= Blog Section ======= */}
            <section id="blog" className="blog">
              <div className="container" data-aos="fade-up">
                <div className="row g-5">
                  <div className="col-lg-12" data-aos="fade-up" data-aos-delay={200}>
                    <div className="row gy-5 posts-list">
                      <div className="col-lg-6">
                        <article className="d-flex flex-column">
                          <div className="post-img">
                            <img src="assets/img/blog/blog-1.jpg" alt="" className="img-fluid" />
                          </div>
                          <h2 className="title">
                            <a href="blog-details.html">Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia</a>
                          </h2>
                          <div className="meta-top">
                            <ul>
                              <li className="d-flex align-items-center"><i className="bi bi-person" /> <a href="blog-details.html">John Doe</a></li>
                              <li className="d-flex align-items-center"><i className="bi bi-clock" /> <a href="blog-details.html"><time dateTime="2022-01-01">Jan 1, 2022</time></a></li>
                              <li className="d-flex align-items-center"><i className="bi bi-chat-dots" /> <a href="blog-details.html">12 Comments</a></li>
                            </ul>
                          </div>
                          <div className="content">
                            <p>
                              Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                            </p>
                          </div>
                          <div className="read-more mt-auto align-self-end">
                            <a href="blog-details.html">Read More <i className="bi bi-arrow-right" /></a>
                          </div>
                        </article>
                      </div>{/* End post list item */}
                      <div className="col-lg-6">
                        <article className="d-flex flex-column">
                          <div className="post-img">
                            <img src="assets/img/blog/blog-2.jpg" alt="" className="img-fluid" />
                          </div>
                          <h2 className="title">
                            <a href="blog-details.html">Nisi magni odit consequatur autem nulla dolorem</a>
                          </h2>
                          <div className="meta-top">
                            <ul>
                              <li className="d-flex align-items-center"><i className="bi bi-person" /> <a href="blog-details.html">John Doe</a></li>
                              <li className="d-flex align-items-center"><i className="bi bi-clock" /> <a href="blog-details.html"><time dateTime="2022-01-01">Jan 1, 2022</time></a></li>
                              <li className="d-flex align-items-center"><i className="bi bi-chat-dots" /> <a href="blog-details.html">12 Comments</a></li>
                            </ul>
                          </div>
                          <div className="content">
                            <p>
                              Incidunt voluptate sit temporibus aperiam. Quia vitae aut sint ullam quis illum voluptatum et. Quo libero rerum voluptatem pariatur nam.
                            </p>
                          </div>
                          <div className="read-more mt-auto align-self-end">
                            <a href="blog-details.html">Read More <i className="bi bi-arrow-right" /></a>
                          </div>
                        </article>
                      </div>{/* End post list item */}             
                    </div>{/* End blog posts list */}
                    <div className="blog-pagination">
                      <ul className="justify-content-center">
                        <li><a href="#">1</a></li>
                        <li className="active"><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                      </ul>
                    </div>{/* End blog pagination */}
                  </div>
                </div>
              </div>
            </section>{/* End Blog Section */}
          </main>{/* End #main */}
          {/* ======= Footer ======= */}
          <footer id="footer" className="footer">
            <div className="footer-content">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-lg-5 col-md-12 footer-info">
                    <a href="index.html" className="logo d-flex align-items-center">
                      <span>Nova</span>
                    </a>
                    <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                    <div className="social-links d-flex  mt-3">
                      <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                      <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                      <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                      <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                  </div>
                  <div className="col-lg-2 col-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      <li><i className="bi bi-dash" /> <a href="#">Home</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">About us</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Services</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Terms of service</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Privacy policy</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-2 col-6 footer-links">
                    <h4>Our Services</h4>
                    <ul>
                      <li><i className="bi bi-dash" /> <a href="#">Web Design</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Web Development</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Product Management</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Marketing</a></li>
                      <li><i className="bi bi-dash" /> <a href="#">Graphic Design</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                    <h4>Contact Us</h4>
                    <p>
                      A108 Adam Street <br />
                      New York, NY 535022<br />
                      United States <br /><br />
                      <strong>Phone:</strong> +1 5589 55488 55<br />
                      <strong>Email:</strong> info@example.com<br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-legal">
              <div className="container">
                <div className="copyright">
                  © Copyright <strong><span>Nova</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                  {/* All the links in the footer should remain intact. */}
                  {/* You can delete the links only if you purchased the pro version. */}
                  {/* Licensing information: https://bootstrapmade.com/license/ */}
                  {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nova-bootstrap-business-template/ */}
                  Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>
            </div>
          </footer>{/* End Footer */}
          {/* End Footer */}
          <a href="#" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
          <div id="preloader" />
          {/* Vendor JS Files */}
          {/* Template Main JS File */}
        </div>
      );
    
  }

  export default Homepage;