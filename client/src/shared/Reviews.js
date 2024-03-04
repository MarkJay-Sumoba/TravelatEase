import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, ListGroup, Button } from "reactstrap";
import avatar from "../assets/images/avatar.jpg";
import { LoginContext } from "../contexts/LoginContextProvider";
import axios from "axios";

const Reviews = ({ tourData, id, redirectToParent }) => {
  const [tour, setTour] = useState(tourData);
  const [tourRating, setTourRating] = useState(null);
  const reviewMsgRef = useRef("");
  const { isLogin, userID } = useContext(LoginContext);

  useEffect(() => {
    setTour(tourData);
    console.log("tourData delivered : ", tourData);
  }, [tourData]);

  const submitHandler = async (ev) => {
    ev.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      const reviewData = {
        tourID: id,
        userID: userID,
        message: reviewText,
        rating: tourRating,
      };
      const response = await axios.post(
        `https://travelatease-5e3f78deebae.herokuapp.com/api/postReview`,
        reviewData
      );

      console.log("API Response: ", response);

      const { review, tour } = response.data;
      setTour(tour);
      console.log("Create Review Result: ", review);
      console.log("New tour Info: ", tour);

      // Reset star rating and text input
      setTourRating(null);
      reviewMsgRef.current.value = "";
      console.log("Redirecting to parent...");
      redirectToParent();
    } catch (error) {
      console.error("Error occured during posting review");
    }
  };

  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <>
      {/* Review Section */}
      <div className="tour_reviews mt-4">
        {console.log(" tour.tourReviews : ", tour.tourReviews)}
        <h4>Reviews ( {tour.tourReviews?.length} reviews )</h4>
        {isLogin ? (
          <>
            <Form onSubmit={submitHandler}>
              <div className="rating_group d-flex align-items-center gap-3 mb-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    // key={index}
                    key={tour.tourReviews.tourID}
                    onClick={() => setTourRating(index + 1)}
                    style={{
                      color: index < tourRating ? "gold" : "gray",
                      cursor: "pointer",
                    }}
                  >
                    {index + 1}
                    <i
                      className={`bi bi-star${
                        index < tourRating ? "-fill" : ""
                      }`}
                    ></i>
                  </span>
                ))}
              </div>
              <div className="review_input d-flex align-items-center justify-content-between">
                <input
                  type="text"
                  ref={reviewMsgRef}
                  placeholder="Share your thoughts"
                  required
                />
                <Button className="btn primary_btn text-white" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            <ListGroup className="user_reviews">
              {tour.tourReviews?.map((review) => (
                <div className="review_item" key={review.id}>
                  <img src={avatar} alt="" />
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h5>{review.reviewUser?.firstname || "Anonymous"}</h5>
                        <p>
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </p>
                      </div>
                      <span className="d-flex align-items-center">
                        {review.rating} <i className="bi bi-star-fill"></i>
                      </span>
                    </div>
                    <h6>{review.message}</h6>
                  </div>
                </div>
              ))}
            </ListGroup>
          </>
        ) : (
          <ListGroup className="user_reviews">
            {tour.tourReviews?.map((review) => (
              <div className="review_item" key={review.id}>
                <img src={avatar} alt="" />
                <div className="w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>{review.reviewUser?.firstname || "Anonymous"}</h5>
                      <p>
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </p>
                    </div>
                    <span className="d-flex align-items-center">
                      {review.rating} <i className="bi bi-star-fill"></i>
                    </span>
                  </div>
                  <h6>{review.message}</h6>
                </div>
              </div>
            ))}
          </ListGroup>
        )}
      </div>
      {/* // End of Review ); */}
    </>
  );
};

export default Reviews;
