import { Link } from "gatsby"
import React from "react"
import {Container, Row, Col} from 'reactstrap';
import payment from "~/assets/img/payment.png";

const Footer = (data) => {
  return (
    <>
      <footer className="border border-bottom-0 border-left-0 border-right-0">
        <div className="footer-top py-3 py-lg-5">
          <Container>
            <Row className="mx-0">
              <Col className="col-12 col-md-6 px-0">
                <ul className="list-unstyled p-0 m-0">
                  <li>
                    <Link
                      to="/page/shipping"
                      className="josefin-sans text-dark text-decoration-none"
                      style={{ fontSize: '1.2rem' }}
                    >
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/page/refund-policy"
                      className="josefin-sans text-dark text-decoration-none"
                      style={{ fontSize: '1.2rem' }}
                    >
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/page/privacy-policy"
                      className="josefin-sans text-dark text-decoration-none"
                      style={{ fontSize: '1.2rem' }}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/page/terms-of-service"
                      className="josefin-sans text-dark text-decoration-none"
                      style={{ fontSize: '1.2rem' }}
                    >
                      Terms of service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/page/contact-us"
                      className="josefin-sans text-dark text-decoration-none"
                      style={{ fontSize: '1.2rem' }}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col className="col-12 col-md-6 px-0">
                <div className="news-letter">
                  <h4
                    className="josefin-sans-b"
                    style={{ color: '#000', fontSize: '1.5rem' }}
                  >
                    Newsletter
                  </h4>
                  <p
                    className="josefin-sans text-dark"
                    style={{ fontSize: '1rem' }}
                  >
                    Stay up to date with our latest creations and discounts!
                  </p>
                  <div className="single mt-3 mt-lg-4">
                    <div className="input-group col-12 col-md-8 px-0 news-letter-form">
                      <input
                        type="email"
                        className="form-control josefin-sans"
                        placeholder="Your Email Address"
                      />
                      <span className="input-group-btn">
                        <button
                          className="btn btn-theme josefin-sans-b"
                          type="submit"
                        >
                          SIGN UP
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-bottom border border-left-0 border-right-0 border-bottom-0 py-3 py-lg-5">
          <Container>
            <Row className="mx-0">
              <Col className="col-12 col-lg-4">
                <ul className="list-unstyled px-0 d-block text-left m-0 social-links">
                  <li className="d-inline-block mr-3">
                    <a href="https://twitter.com/demosoap" className="">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="d-inline-block mr-3">
                    <a
                      href="https://www.facebook.com/Demo-Soap-184227641589990"
                      className=""
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li className="d-inline-block mr-3">
                    <a href="http://instagram.com/demosoap" className="">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col className="col-12 col-lg-4">
                <p
                  className="josefin-sans w-100 text-center"
                  style={{ fontSize: '1.2rem' }}
                >
                  © 2020{' '}
                  <b className="josefin-sans-b" style={{ color: '#000' }}>
                    Demosoap
                  </b>{' '}
                  All rights reserved.
                </p>
              </Col>
              <Col className="col-12 col-lg-4 text-right">
                <img src={payment} alt="Payment" />
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  )
}



export default Footer
