import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "../styles/TourDetails.css";
import calculateAvgRating from "../utils/avgRating";
import { useParams } from "react-router-dom";
import Booking from "../components/Booking/Booking";
import Reviews from "../shared/Reviews";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(
          `https://travelatease-5e3f78deebae.herokuapp.com//api/tours/${id}`
        );
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTour();
  }, [id, refresh]);

  const handleRedirect = () => {
    // set redirecting path
    console.log("Redirecting ...");
    setRefresh(!refresh);
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  const { totalRating, avgRating } = calculateAvgRating(tour.tourReviews);

  return (
    <>
      <section className="mt-4">
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour_content ">
                <img src={tour.imageUrl} alt="" />
                <div className="tour_info">
                  <h2>{tour.title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour_rating d-flex align-items-center gap-1 ">
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not yet rated"
                      ) : (
                        <span>({tour.tourReviews.length})</span>
                      )}
                    </span>
                    <span>
                      <i className="bi bi-pin-map-fill"></i>
                      {tour.city}
                    </span>
                  </div>
                  <div className="tour_details">
                    <span>
                      <i className="bi bi-geo"></i>
                      {tour.address}
                    </span>
                    <span>
                      <i className="bi bi-currency-dollar"></i>
                      {tour.price}/per person
                    </span>
                    <span>
                      <i className="bi bi-people"></i>
                      {tour.availability} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{tour.description}</p>

                  {/* Review Section */}
                  <Reviews
                    tourData={tour}
                    id={id}
                    redirectToParent={handleRedirect}
                  />
                  {/* End of Review  */}
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
