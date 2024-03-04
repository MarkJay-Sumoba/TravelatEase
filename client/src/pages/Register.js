import "../styles/Register.css";
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Alert,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";

export default function Register() {
  let navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (data, { setSubmitting }) => {
    console.log("Form submitted with data:", data);
    try {
      await axios.post(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/register",
        data
      );

      console.log("Registration successful!");
      setShowAlert(true);
      // Delay navigation by 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        setShowErrorAlert(error.response.data.message);
      } else {
        console.error("Error:", error);
      }
      console.log("Registration not successful");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number or special character"
      )
      .required("Password is required"),
  });

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div className="register_container d-flex justify-content-between">
            {/* Left Side */}
            <div className="register_img d-flex justify-content-center align-items-center">
              <h3 className="text-white text-center">
                Travel, Explore, Uncover: Your Journey, Your Adventure!
              </h3>
            </div>

            {/* Right Side */}
            <div className="register_form mt-3 mx-5">
              <h2 className="mb-4 text-center">Join Us!</h2>
              {/* Formik handles form state, validation, and submission */}
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    {/* Email */}
                    <FormGroup>
                      <Label htmlFor="email">Email:</Label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="form-control"
                      />
                      {/* Display Yup errors as Bootstrap alerts */}
                      <ErrorMessage
                        name="email"
                        render={(msg) => <Alert color="danger">{msg}</Alert>}
                      />
                    </FormGroup>
                    {/* Password */}
                    <FormGroup>
                      <Label htmlFor="password">Password:</Label>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                      />
                      {/* Display Yup errors as Bootstrap alerts */}
                      <ErrorMessage
                        name="password"
                        render={(msg) => <Alert color="danger">{msg}</Alert>}
                      />
                    </FormGroup>
                    <div className="text-center mt-4">
                      {/* Use type="submit" to trigger form submission */}
                      <Button type="submit" className="btn btn-info px-4">
                        Register
                      </Button>
                    </div>
                    <div className="text-center mt-3">
                      Already have an account?
                      <Link to="/login">Login here</Link>
                    </div>
                  </Form>
                )}
              </Formik>
              {/* Show success alert if showAlert is true */}
              {showAlert && (
                <Alert color="success" className="mt-3">
                  Registration successful! You can now login.
                </Alert>
              )}

              {showErrorAlert && (
                <Alert color="danger" className="mt-3">
                  {showErrorAlert}
                </Alert>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
