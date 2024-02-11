import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { LoginContext } from "../contexts/LoginContextProvider";
import "../styles/Login.css";
import loginImg from "../assets/images/login.jpg";

export default function Login() {
  const { isLogin, isAdmin, errorMsg, login } = useContext(LoginContext);

  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    console.log("isLogin : ", isLogin);
    console.log("isAdmin : ", isAdmin);
    console.log("error message : ", errorMsg);

    if (isLogin) {
      // Reset error-related states
      setErrorMessage("");
      setShowErrorAlert(false);

      // Set success state
      setShowSuccessAlert(true);

      // To reset the loading state
      // setLoading(false);
    }
  }, [isLogin, isAdmin, errorMsg]);

  const onSubmit = async (data, { setSubmitting }) => {
    try {
      // Set loading state while waiting for a response logging in
      // setLoading(true);
      await login(data);
      if (!isLogin) {
        setShowErrorAlert(true);
        setErrorMessage(errorMsg);
      }

      // Delay navigation by 2 seconds
      setTimeout(() => {
        // Check user role and navigate accordingly
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      // Set error state
      setShowErrorAlert(true);
      if (errorMsg) {
        // If the server provides an error message, set it in the state
        setErrorMessage(errorMsg);
      } else {
        // Fallback error message
        setErrorMessage("Login failed! Please check your credentials.");
      }
      // // Set error state
      // setShowErrorAlert(true);
    } finally {
      setSubmitting(false); // Set form to not submitting state
      // Reset loading state even if there is an error
      // setLoading(false);
    }
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <div className="login_container d-flex justify-content-between">
            {/* Left Side */}
            <div className="login_img">
              <img src={loginImg} alt="" />
            </div>

            {/* Right Side */}
            <div className="login_form mt-5">
              <h2 className="text-center mb-4">Login</h2>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* Email */}
                    <FormGroup floating>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="form-control"
                      />
                      <Label htmlFor="email">Email</Label>
                      {/* Display Yup errors as Bootstrap alerts */}
                      <ErrorMessage
                        name="email"
                        render={(msg) => <Alert color="danger">{msg}</Alert>}
                      />
                    </FormGroup>
                    <FormGroup floating>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                      />
                      <Label htmlFor="password">Password</Label>
                      {/* Display Yup errors as Bootstrap alerts */}
                      <ErrorMessage
                        name="password"
                        render={(msg) => <Alert color="danger">{msg}</Alert>}
                      />
                    </FormGroup>
                    <div className="btn mt-2 text-center">
                      <Button className="btn btn-info px-4" type="submit">
                        Login
                      </Button>
                    </div>
                    <div className="mt-4 text-center">
                      Don't have an account?
                      <Link to="/register">Register here</Link>
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Show success alert if showSuccessAlert is true */}
              {showSuccessAlert && (
                <Alert color="success" className="mt-3">
                  Login successful!
                </Alert>
              )}

              {/* Show error alert if showErrorAlert is true */}
              {showErrorAlert && (
                <Alert color="danger" className="mt-3">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
