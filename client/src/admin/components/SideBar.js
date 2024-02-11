import "../styles/Admin.css";
import React, { useContext } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { LoginContext } from "../../contexts/LoginContextProvider";
import ProfilePic from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(LoginContext);
  return (
    <Nav vertical className="sidebar bg-dark text-center">
      <div className="profile_pic mt-5 mb-2">
        <img src={ProfilePic} alt="" className="w-50" />
        <h3 className="mt-2 mb-4 text-white">Admin</h3>
      </div>
      <NavItem>
        <Link className="text-white" to={"/"}>
          Home
        </Link>
      </NavItem>
      <NavItem>
        <NavLink href="#">Tours</NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="nav_bottom" onClick={logout} href="#">
          Logout
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Sidebar;
