import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormLabel,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ProfilePic from "../assets/images/avatar.jpg";
import Logo from "../assets/images/logo.jpg";
import { LoginContext } from "../contexts/LoginContextProvider";
import "../styles/Profile.css";

export default function Profile() {
  const { isLogin, userID, userInfo, logout, performLogout } =
    useContext(LoginContext);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  let navigate = useNavigate();
  const isMounted = useRef(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFail, setUpdateFail] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isLogin) {
      console.error("User is not authenticated");
      // Make sure navigate is called within useEffect
      if (isMounted.current) {
        navigate("/login");
      }
    } else {
      // initialize user as login User data
      setUser(userInfo);
    }
  }, [isLogin, userInfo, navigate]);

  const initialValues = {
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    dob: user?.DOB ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    province: user?.province ?? "",
    zip: user?.zip ?? "",
    phone: user?.phone ?? "",
  };

  const handleProfileUpdate = async (data) => {
    try {
      const response = await axios.patch(
        `https://localhost:3001/api/userUpdate/${userID}`,
        data
      );
      console.log("User data updated: ", response.data);

      // Fetch updated user data after the update
      const updatedUserData = await axios.get(
        `https://localhost:3001/api/user/${userID}`
      );

      // Update the user state with the new data
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUserData.data,
      }));

      // Navigate to the profile page and set the default active tab to "info"
      navigate("/profile");

      // Set the active tab to "info" after the update
      setActiveTab("info");
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  // Reset password fields
  const handlePasswordChange = async (data, { resetForm }) => {
    try {
      const dataToChangePassword = {
        id: userID,
        newPassword: data.newPassword,
      };

      const response = await axios.patch(
        "https://localhost:3001/api/change-password",
        dataToChangePassword
      );

      console.log("Result of Password update : ", response);
      if (response.status === 403) {
        // Set the Fail status to true
        setUpdateFail(true);
        return;
      } else {
        // Set the success status to true
        setUpdateSuccess(true);
      }

      // Reset password fields
      resetForm();
    } catch (error) {
      console.error("Error occured while changing password", error);
      // Set the Fail status to true
      setUpdateFail(true);
    }
  };

  // Use useEffect to reset updateFail state after a delay
  useEffect(() => {
    if (updateFail) {
      const timeoutId = setTimeout(() => {
        setUpdateFail(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [updateFail]);

  // Use useEffect to reset updateSuccess state after a delay
  useEffect(() => {
    if (updateSuccess) {
      const timeoutId = setTimeout(() => {
        setUpdateSuccess(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [updateSuccess]);

  // Delete User Account
  const handleAccountDeletion = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:3001/api/delete-user/${userID}`
      );

      console.log("Account deleted successfully: ", response);

      // clean up the user data and cookie set in the client side
      performLogout();
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };

  //Get Bookings with image.Url
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingsResponse = await axios.get(
          `https://localhost:3001/api/get-bookings/${userID}`
        );
        const bookingsData = bookingsResponse.data;

        const bookingsWithTourDetails = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const tourResponse = await axios.get(
                `https://localhost:3001/api/tours/${booking.tourID}`
              );
              return { ...booking, tour: tourResponse.data };
            } catch (error) {
              console.error(
                `Error fetching tour for booking ID ${booking.bookingID}`,
                error
              );
              return booking;
            }
          })
        );

        setBookings(bookingsWithTourDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (activeTab === "my_bookings") {
      fetchBookingData();
    }
  }, [activeTab, userID]);

  // Logout
  const handleLogout = () => {
    logout();
  };

  // Form validation schema

  // Validation schema for Update Profile
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3).required("First name is required.(min : 3)"),
    lastname: Yup.string().min(2).required("Last name is required.(min : 2)"),
    dob: Yup.date()
      .required("Date of birth is required.")
      .max(new Date(), "Not allowed future date."),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
    zip: Yup.string()
      .matches(
        /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/,
        "Please enter valid ZIP format. (i.e.: A2A1B1"
      )
      .required("ZIP is required"),
    phone: Yup.string().matches(
      /^\d{3}-\d{3}-\d{4}$/,
      "Need vailid format of phone (i.e.: 123-456-7890"
    ),
  });

  // Validation schema for Update Password
  const passwordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required("Current password is required")
      .min(8, "Current password must be at least 8 characters long"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "New password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  return (
    <>
      <Container>
        <Row>
          <div className="nav_wrap d-flex align-items-center justify-content-between">
            <div>
              <img
                src={Logo}
                width="150"
                height="150"
                className="mx-3"
                alt=""
              />
            </div>
            <div className="d-flex align-items-center fw-bold">
              <NavLink to={"/"} className="mx-3">
                <h4>
                  <i class="bi bi-arrow-return-left"></i>
                  Back
                </h4>
              </NavLink>
            </div>
          </div>
        </Row>
      </Container>

      <Container className=" p-5">
        <div className="d-flex align-items-center ">
          <img
            className="profile_picture mx-5 mt-5 mb-2 text-center"
            src={ProfilePic}
            alt=""
          />
          <Col lg="8">
            <h2 className="text-center">User Account</h2>
          </Col>
        </div>
        <Tab.Container
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
        >
          <Row>
            <Col lg={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="info">Info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="edit">Edit Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="update_password">
                    Change Password
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="delete_account">Delete Account</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="my_bookings">Bookings</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link to="/" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={9}>
              <Tab.Content>
                <Tab.Pane eventKey="info" className="border p-3">
                  {user ? (
                    <div>
                      <p>
                        <strong>Name : </strong>
                        {user.firstname}, {user.lastname}
                      </p>
                      <p>
                        <strong>DOB : </strong>
                        {user.DOB &&
                          new Date(user.DOB).toLocaleDateString("en-CA", {
                            timeZone: "UTC",
                          })}
                      </p>
                      <p>
                        <strong>Address : </strong>
                        {user.address}, {user.city}, {user.province}, {user.zip}
                      </p>
                      <p>
                        <strong>Phone : </strong>
                        {user.phone}
                      </p>
                      <p>
                        <strong>Email : </strong>
                        {user.email}
                      </p>
                    </div>
                  ) : (
                    <>
                      {navigate("/login")}
                      <p>User information is loading...</p>
                    </>
                  )}
                </Tab.Pane>

                {/* Update Profile */}
                <Tab.Pane eventKey="edit" className="border p-3">
                  <h3 className="mb-4">Edit Profile</h3>
                  {user && (
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={(values, { resetForm }) =>
                        handleProfileUpdate(values, { resetForm })
                      }
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                          <Row className="mb-3">
                            <Col lg="3">
                              <FormLabel>First Name: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Enter your first name"
                                name="firstname"
                              />
                              <ErrorMessage
                                name="firstname"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                            <Col lg="3">
                              <FormLabel>Last Name: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Enter your last name"
                                name="lastname"
                              />
                              <ErrorMessage
                                name="lastname"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                            <Col sm="3">
                              <FormLabel>Date Of Birth: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="date"
                                placeholder="Enter your date of birth"
                                name="dob"
                              />
                              <ErrorMessage
                                name="dob"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg="9">
                              <FormLabel>Address: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                              />
                              <ErrorMessage
                                name="address"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg="4">
                              <FormLabel>City: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Enter your city"
                                name="city"
                              />
                              <ErrorMessage
                                name="city"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                            <Col lg="2">
                              <FormLabel>Province: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Enter your province"
                                name="province"
                              />
                              <ErrorMessage
                                name="province"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                            <Col lg="3">
                              <FormLabel>Zip: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Enter your ZIP code"
                                name="zip"
                              />
                              <ErrorMessage
                                name="zip"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <FormLabel>Phone: </FormLabel>
                            <Col lg="4">
                              <Field
                                as={Form.Control}
                                type="text"
                                placeholder="Enter your Phone number"
                                name="phone"
                              />
                              <ErrorMessage
                                name="phone"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                          </Row>

                          <div className="text-center mt-3 mb-3">
                            <Button variant="primary" type="submit">
                              Save Changes
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                </Tab.Pane>

                {/* Change Password */}
                <Tab.Pane eventKey="update_password">
                  <h3 className="mb-4">Change Password</h3>
                  {user && (
                    <Formik
                      initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      }}
                      validationSchema={passwordValidationSchema}
                      onSubmit={(values, { resetForm }) =>
                        handlePasswordChange(values, { resetForm })
                      }
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                          <Row className="mb-3">
                            <Col lg="4">
                              <FormLabel>Current Password: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="password"
                                placeholder="Enter your current password"
                                name="currentPassword"
                              />
                              <ErrorMessage
                                name="currentPassword"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg="4">
                              <FormLabel>New Password: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="password"
                                placeholder="Enter your new password"
                                name="newPassword"
                              />
                              <ErrorMessage
                                name="newPassword"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg="4">
                              <FormLabel>Confirm Password: </FormLabel>
                              <Field
                                as={Form.Control}
                                type="password"
                                placeholder="Confirm your new password"
                                name="confirmPassword"
                              />
                              <ErrorMessage
                                name="confirmPassword"
                                render={(msg) => (
                                  <Alert variant="danger">{msg}</Alert>
                                )}
                              />
                            </Col>
                          </Row>
                          <div className="my-3">
                            <Button variant="primary" type="submit">
                              Change Password
                            </Button>
                          </div>
                          {updateSuccess && (
                            <Alert variant="success">
                              Password updated successfully!
                            </Alert>
                          )}
                          {updateFail && (
                            <Alert variant="danger">
                              Password update Failed!
                            </Alert>
                          )}
                        </Form>
                      )}
                    </Formik>
                  )}
                </Tab.Pane>

                {/* Delete User's Account */}
                <Tab.Pane eventKey="delete_account" className="">
                  <h3 className="mb-4">Delete Account</h3>
                  <p>Are you sure you want to delete your account?</p>
                  <div className=" mt-3 mb-3">
                    <Button variant="danger" onClick={handleAccountDeletion}>
                      Delete Account
                    </Button>
                  </div>
                </Tab.Pane>

      {/* Display Bookings */}
<Tab.Pane eventKey="my_bookings">
  <div className="container mt-4">
    <h3 className="mb-4">My Bookings</h3>
    {/* Placeholder for displaying bookings */}
    {bookings.length > 0 ? (
      <div className="card-deck">
        {bookings.map((booking) => (
          <div key={booking.bookingID} className="card mb-4">
            <div className="row no-gutters">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <div className="image-container">
                  <img
                    src={booking.tour && booking.tour.imageUrl}
                    className="card-img img-fluid"
                    alt="Tour Image"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {booking.tour && booking.tour.title}
                  </h5>
                  <p className="card-text">
                    <strong>Booking ID:</strong> {booking.bookingID}
                    <br />
                    <strong>Date:</strong> {booking.tour && booking.tour.tourDate}
                    <br />
                    <strong>Full Name:</strong> {booking.providedFullName}
                    <br />
                    <strong>Email:</strong> {booking.providedEmail}
                    <br />
                    <strong>Phone:</strong> {booking.providedPhone}
                    <br />
                    <strong>Guests:</strong> {booking.guests}
                    <br />
                    <strong>Total Price:</strong> ${booking.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No bookings found.</p>
    )}
  </div>
</Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
}
