import React, { useContext } from "react";
import "./Header.css";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";

import logo from "../../assets/images/logo.jpg";

export default function Header() {
  const { isAdmin, isLogin, logout } = useContext(LoginContext);

  const nav_links = [
    {
      path: "/home",
      display: "Home",
    },
    {
      path: "/home#aboutus",
      display: "About",
    },
    {
      path: "/tours",
      display: "Tours",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  // To show only the logout button whenever an Admin is logged in
  if (isLogin && isAdmin) {
    return (
      <header className="header">
        <Container fluid>
          <Row>
            <div className="nav_wrap d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              {/* Logo */}

              {/*menu*/}
              <div className="navigation">
                <ul className="menu d-flex align-items-center gap-4 list-unstyled">
                  {nav_links.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active_link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              {/*menu*/}

              {/* Logout button for admin */}
              <div className="nav_right d-flex align-items-center gap-4">
                <Link to="/admin" className="profile_link mx-2">
                  <i className="bi bi-person-circle"></i>
                  Admin
                </Link>
                <Button>
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </Button>
              </div>
              {/* Logout button for admin */}
            </div>
          </Row>
        </Container>
      </header>
    );
  }

  // For user role = 0 (default)
  return (
    <header className="header">
      <Container fluid>
        <Row>
          <div className="nav_wrap d-flex align-items-center justify-content-between">
            {/*Logo*/}
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            {/*Logo*/}

            {/*menu*/}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-4 list-unstyled">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active_link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/*menu*/}

            {/*authentication*/}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {isLogin ? (
                  <>
                    {/* If authenticated, display profile logout */}
                    <Link to="/profile" className="profile_link mx-2">
                      <i className="bi bi-person-circle"></i>
                      Profile
                    </Link>
                    <Button>
                      <Link to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary_btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              {/*authentication*/}

              <span className="mobile_menu">
                <i className="bi bi-list"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}
