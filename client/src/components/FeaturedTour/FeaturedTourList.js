import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import TourCard from "../../shared/TourCard";
import axios from "axios";

export default function FeaturedTourList() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios
      .get("https://travelatease-5e3f78deebae.herokuapp.com//api/tours")
      .then((response) => {
        setTours(response.data);
        console.log("Featured Tours List with url: ", response);
      })
      .catch((error) => console.error("Error fetching tours:", error));
  }, []);

  return (
    <>
      {tours.map((tour) => (
        <Col lg="3" classname="mb-4" key={tour.tourID}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
}
