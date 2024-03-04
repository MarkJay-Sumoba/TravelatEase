import React, { useState, useEffect } from "react";
import {
  Row,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./styles/UpdateTour.css";
import Logo from "../assets/images/logo.jpg";

export default function UpdateTour() {
  const [file, setFile] = useState(null);

  const [tourData, setTourData] = useState({
    title: "",
    price: "",
    availability: "",
    region: "",
    country: "",
    city: "",
    address: "",
    tourDate: "",
    description: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://travelatease-5e3f78deebae.herokuapp.com/api/tours/${id}`)
      .then((response) => {
        const tour = response.data;
        setTourData({
          title: tour.title || "",
          price: tour.price || "",
          availability: tour.availability || "",
          region: tour.region || "",
          country: tour.country || "",
          city: tour.city || "",
          address: tour.address || "",
          tourDate: tour.tourDate || "",
          description: tour.description || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching tour data:", error);
      });
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", tourData.title);
      formData.append("price", tourData.price);
      formData.append("availability", tourData.availability);
      formData.append("tourDate", tourData.tourDate);
      formData.append("region", tourData.region);
      formData.append("country", tourData.country);
      formData.append("city", tourData.city);
      formData.append("address", tourData.address);
      formData.append("description", tourData.description);
      formData.append("image", file);

      console.log("==================");
      console.log(tourData.city);
      console.log("before sending formData : ", formData);

      const response = await axios.put(
        `https://travelatease-5e3f78deebae.herokuapp.com/api/update-tour/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Updated Tour:", response.data);
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };
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

      <div className="d-flex justify-content-center align-items-center mt-5">
        <Form
          className="formContainer col-lg-6 border p-5"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <h1 className="title_content mt-3 pb-2"> Edit Tours </h1>
          <FormGroup className="mt-5">
            <Label>Tour Title: </Label>
            <Input
              autoComplete="off"
              name="title"
              value={tourData.title}
              className="form-control"
              onChange={(e) =>
                setTourData({ ...tourData, title: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Tour Price: </Label>
            <Input
              autoComplete="off"
              name="price"
              value={tourData.price}
              className="form-control"
              onChange={(e) =>
                setTourData({ ...tourData, price: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Max Group: </Label>
            <Input
              autoComplete="off"
              name="availability"
              value={tourData.availability}
              className="form-control"
              onChange={(e) =>
                setTourData({ ...tourData, availability: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Region: </Label>
            <Input
              autoComplete="off"
              name="region"
              value={tourData.region}
              className="form-control-file"
              onChange={(e) =>
                setTourData({ ...tourData, region: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Country: </Label>
            <Input
              autoComplete="off"
              name="country"
              value={tourData.country}
              className="form-control"
              onChange={(e) =>
                setTourData({ ...tourData, country: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>City: </Label>
            <Input
              autoComplete="off"
              name="city"
              value={tourData.city}
              className="form-control"
              onChange={(e) =>
                setTourData({ ...tourData, city: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Address: </Label>
            <Input
              autoComplete="off"
              name="address"
              value={tourData.address}
              className="form-control"
              onChange={(e) =>
                setTourData({ ...tourData, address: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Tour Date: </Label>
            <Input
              type="date"
              autoComplete="off"
              name="tourDate"
              value={tourData.tourDate}
              onChange={(e) =>
                setTourData({ ...tourData, tourDate: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Description: </Label>
            <Input
              type="textarea"
              autoComplete="off"
              name="description"
              value={tourData.description}
              className="form-control"
              onChange={(e) =>
                setTourData({ ...tourData, description: e.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label>Upload Image: </Label>
            <Input
              type="file"
              autoComplete="off"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              className="form-control-file"
            />
          </FormGroup>

          <div className="text-center">
            <Button type="submit" className="btn btn-primary">
              Edit Tour
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
