import React from "react";
import "./Footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

const social_links = [
  {
    path: "https://www.youtube.com",
    icon: <i class="bi bi-youtube"></i>,
  },
  {
    path: "https://www.twitter.com",
    icon: <i class="bi bi-twitter-x"></i>,
  },
  {
    path: "https://www.instagram.com",
    icon: <i class="bi bi-instagram"></i>,
  },
  {
    path: "https://www.facebook.com",
    icon: <i class="bi bi-facebook"></i>,
  },
];

const discover = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick_links = [
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
  {
    path: "/contactus",
    display: "Contact Us",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <h5 className="footer_quick-links">Travel@Ease</h5>
              <img src={logo} alt="" />
              <p className="copyright">
                Copyright @ 2024 by Travel@Ease all rights reserved{" "}
              </p>

              {/* Social Media Links */}
              <div className="social_links d-flex align-items-center gap-4">
                {social_links.map((link, index) => (
                  <Link
                    to={link.path}
                    key={index}
                    className="social_icons p-2 d-flex align-items-center justify-content-center"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
            {/* Social Media Links */}
          </Col>

          {/* Quick Links */}
          <Col lg="3">
            <h5 className="footer_quick-links">Discover</h5>
            <ListGroup className="footer_link-title">
              {discover.map((item, index) => (
                <ListGroupItem>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          {/* Quick Links */}

          {/* Quick Links 2*/}
          <Col lg="3">
            <h5 className="footer_quick-links">Quick Links</h5>
            <ListGroup className="footer_link-title">
              {quick_links.map((item, index) => (
                <ListGroupItem>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          {/* Quick Links 2*/}

          <Col lg="3">
            <h5 className="footer_quick-links">Contacts: </h5>
            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
              <h6 className="mb-0 d-flex align-items-center gap-2">
                <span>
                  <i className="bi bi-pin-map"></i>
                </span>
                Address:
              </h6>
              <p className="mb-0">1234 Rue Masson Montreal, QC Canada</p>
            </ListGroupItem>

            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
              <h6 className="mb-0 d-flex align-items-center gap-2">
                <span>
                  <i class="bi bi-envelope"></i>
                </span>
                Email:
              </h6>
              <p className="mb-0">TravelEase@gmail.com</p>
            </ListGroupItem>

            <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
              <h6 className="mb-0 d-flex align-items-center gap-2">
                <span>
                  <i class="bi bi-telephone"></i>
                </span>
                Tel# :
              </h6>
              <p className="mb-0">+1 (514) 123-456</p>
            </ListGroupItem>
          </Col>

          {/* Copyrights */}
          <Col lg="12" className="pt-4">
            <div className="text-center"></div>
          </Col>
          {/* Copyrights */}
        </Row>
      </Container>
    </footer>
  );
}
