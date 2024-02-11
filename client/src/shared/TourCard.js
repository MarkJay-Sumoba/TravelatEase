import "../styles/TourCard.css";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import axios from "axios";

export default function TourCard({ tour }) {
  const [tourReviews, setTourReviews] = useState(null);

  useEffect(() => {
    console.log("tour info delivered : ", tour);
    const fetchTour = async () => {
      try {
        const response = await axios.get(
          `https://localhost:3001/api/tours/${tour.tourID}`
        );
        setTourReviews(response.data.tourReviews);
      } catch (error) {}
    };
    fetchTour();
  }, []);

  const { totalRating, avgRating } = calculateAvgRating(tourReviews);
  return (
    <div className="tour_card">
      <Card key={tour.id}>
        <div className="tour_img">
          <img src={tour.imageUrl} alt="" />
          {tour.featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="tour_location d-flex align-items-center gap-1">
              <i className="bi bi-pin-map"></i>
              {tour.city}
            </span>
            <span className="tour_rating d-flex align-items-center gap-1">
              <i className="bi bi-star-fill"></i>
              {tourReviews?.length > 0 ? (
                <>
                  {avgRating === 0 ? null : avgRating}
                  {totalRating === 0 ? (
                    "Not yet rated"
                  ) : (
                    <span>({tourReviews.length})</span>
                  )}
                </>
              ) : (
                "Not yet rated"
              )}
            </span>
          </div>
          <h5 className="tour_title">
            <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
          </h5>
          <div className="card_bottom d-flex align-items-center justify-content-between">
            <h5>
              ${tour.price} <span> /per person</span>
            </h5>
            <Button className="btn booking_btn">
              <Link to={`/tours/${tour.tourID}`}>Book now</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
