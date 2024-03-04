import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Col,
  Row,
} from "reactstrap";

export default function ContactUs() {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/contactus",
        values
      );

      if (response.status === 201) {
        console.log("Submitted successfully");
        resetForm();
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6">
          <section>
            <div>
              <h2>Contact Us</h2>
              <p>
                Got a technical issue? Or feedback on our tours? Let us know
              </p>
              <Formik
                initialValues={{ name: "", email: "", message: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <FormGroup>
                    <Label for="name">Name:</Label>
                    <Field type="text" id="name" name="name" as={Input} />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email:</Label>
                    <Field type="email" name="email" as={Input} />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="message">Message:</Label>
                    <Field
                      type="textarea"
                      id="message"
                      name="message"
                      as={Input}
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <div className="text-center mt-3">
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
