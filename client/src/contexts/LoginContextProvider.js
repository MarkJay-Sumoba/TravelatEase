import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const LoginContext = createContext();
LoginContext.displayName = "LoginContextName";

const LoginContextProvider = ({ children }) => {
  // Login Status
  const [isLogin, setIsLogin] = useState(false);
  // User Info
  const [userInfo, setUserInfo] = useState(null);
  // Current User ID
  const [userID, setUserID] = useState(null);
  // Role of current User logged in
  const [isAdmin, setIsAdmin] = useState(false);
  // Login Error message
  const [errorMsg, setErrorMsg] = useState(null);

  /* --------------- Modal handling --------------------------*/
  // Modal visibility state
  const [showModal, setShowModal] = useState(false);
  // Open the Bootstrap modal
  const handleShowModal = () => {
    setShowModal(true);
  };
  // Close the Bootstrap modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  /* ------------------------------------------------------------ */

  // page movement
  const navigate = useNavigate();

  // Used when redirected by Stripe
  const getLoggedInUser = async () => {
    try {
      const userDataResponse = await axios.get(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/logged-in-user",
        { withCredentials: true }
      );

      const userData = userDataResponse.data.user;

      // Check if the user is logged in
      if (userData) {
        loginSetting(userData);
      } else {
        // If not logged in, set the login status to false
        setIsLogin(false);
      }
    } catch (error) {
      console.error("An error occurred while fetching logged-in user: ", error);
    }
  };

  // Use effect to see who is logged in for when redirected by stripe
  useEffect(() => {
    getLoggedInUser();
  }, []);

  const login = async (data) => {
    try {
      const response = await axios.post(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/login",
        data,
        { withCredentials: true }
      );
      if (!response || response.status !== 200) {
        // fail to login
        console.error("Login fail!", response);
        setErrorMsg(response.data.message || "Login failed");
        console.error("Checking current Error : ", response.data.message);
        navigate("/login");
        return;
      }
      console.log(response);
      console.log("Login Success!");

      const userDataResponse = await axios.get(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/logged-in-user",
        { withCredentials: true }
      );

      const userData = userDataResponse.data.user;
      console.log("Before loginSetting: ", userData);

      loginSetting(userData);
    } catch (error) {
      console.error("An error occured during login : ", error);
      setErrorMsg("Login failed! Please check your credentials.");
    }
  };

  // Login setting
  // User data setting
  const loginSetting = (currentUserData) => {
    const { id, email, role } = currentUserData;

    console.log(`userID : ${id}`);
    console.log(`email : ${email}`);
    console.log(`isAdmin : ${role}`);

    setUserID(id);
    setIsAdmin(role);
    setUserInfo(currentUserData);

    // Login status checking : true
    setIsLogin(true);
  };

  const logout = () => {
    // show the modal when logout function is called
    handleShowModal();
  };

  // Logout handling
  const performLogout = async () => {
    try {
      const response = await axios.post(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/logout",
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // Clear client-side token
        document.cookie =
          "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Login status : false
        setIsLogin(false);

        // isAdmin check status : false
        setIsAdmin(false);

        // User ID initialize
        setUserID(null);

        // User info initialize
        setUserInfo(null);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occured during logout : ", error);
    }

    // Close the modal after handling logout
    handleCloseModal();

    // Move to the main page
    navigate("/");
  };
  return (
    <LoginContext.Provider
      value={{
        isLogin,
        isAdmin,
        userID,
        userInfo,
        errorMsg,
        login,
        logout,
        performLogout,
      }}
    >
      {children}
      {/* Bootstrap Modal for logout confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={performLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
