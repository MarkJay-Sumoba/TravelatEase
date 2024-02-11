import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.jpg";
import "./styles/CreateTour.css";

function CreateTour() {
  const [file, setFile] = useState(null);

  const initialValues = {
    title: "",
    price: "",
    availability: "",
    region: "",
    country: "",
    city: "",
    address: "",
    tourDate: "",
    description: "",
  };

  const onSubmit = async (data, { resetForm }) => {
    console.log("Submitting data:", data);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("availability", data.availability);
      formData.append("region", data.region);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("address", data.address);
      formData.append("tourDate", data.tourDate);
      formData.append("description", data.description);

      await axios.post("https://localhost:3001/api/create-tour", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Tour Created Successful!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required"),
    availability: Yup.number().required("Availability is required"),
    region: Yup.string().required("Region is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    tourDate: Yup.date().required("Tour date is required"),
    description: Yup.string().required("Description is required"),
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
              <Link to={"/admin"} className="mx-3">
                <h4>
                  <i className="bi bi-arrow-return-left"></i>
                  Back
                </h4>
              </Link>
            </div>
          </div>
        </Row>
      </Container>

      <div className="createTourPage d-flex justify-content-center align-items-center mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer col-lg-6 border p-5">
            <h1 className="title_content mt-3 pb-2"> Create Tours </h1>
            <div className="form-group mt-5">
              <label htmlFor="title">Tour Title: </label>
              <ErrorMessage name="title" component="span" />
              <Field
                autoComplete="off"
                id="title"
                name="title"
                placeholder="Tour Title"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Tour Price: </label>
              <ErrorMessage name="price" component="span" />
              <Field
                autoComplete="off"
                id="price"
                name="price"
                placeholder="Tour Price"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Max Group:: </label>
              <ErrorMessage name="availability" component="span" />
              <Field
                autoComplete="off"
                name="availability"
                placeholder="Max Guest Group"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="region">Region: </label>
              <ErrorMessage name="region" component="span" />
              <Field
                autoComplete="off"
                id="region"
                name="region"
                placeholder="Region"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country: </label>
              <ErrorMessage name="country" component="span" />
              <Field
                autoComplete="off"
                id="country"
                name="country"
                placeholder="Country"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City: </label>
              <ErrorMessage name="city" component="span" />
              <Field
                autoComplete="off"
                id="city"
                name="city"
                placeholder="City"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address: </label>
              <ErrorMessage name="address" component="span" />
              <Field
                autoComplete="off"
                id="address"
                name="address"
                placeholder="Address"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tourDate">Tour Date: </label>
              <ErrorMessage name="tourDate" component="span" />
              <Field
                type="date"
                autoComplete="off"
                id="tourDate"
                name="tourDate"
                placeholder="Tour Date"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description: </label>
              <ErrorMessage name="description" component="span" />
              <Field
                as="textarea"
                autoComplete="off"
                id="description"
                name="description"
                placeholder="Description"
                className="form-control"
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="image">Upload Image: </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                className="form-control-file"
              />
              <ErrorMessage name="image" component="span" />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Create Tour
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default CreateTour;
