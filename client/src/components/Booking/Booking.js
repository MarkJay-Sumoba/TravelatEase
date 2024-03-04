import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { FormGroup, ListGroup, ListGroupItem, Button, Label } from "reactstrap";

export default function Booking({ tour, avgRating }) {
  const { price } = tour;
  const { userID } = useContext(LoginContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userId: "1",
    userEmail: "",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookDate: "",
    withdraw: "false",
  });

  const handleChange = (ev) => {
    setCredentials((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };

  const handleIncrement = () => {
    setCredentials((prev) => ({ ...prev, guestSize: prev.guestSize + 1 }));
  };

  const handleDecrement = () => {
    setCredentials((prev) => ({
      ...prev,
      guestSize: Math.max(1, prev.guestSize - 1),
    }));
  };

  const handleCheckoutAndBooking = async () => {
    try {
      // Create checkout session
      const checkoutResponse = await axios.post(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/make-payment",
        {
          items: [
            {
              id: tour.tourID,
              title: tour.title,
              quantity: credentials.guestSize,
              price: price,
            },
          ],
        }
      );

      const { url } = checkoutResponse.data;
      window.location = url;

      const response = await axios.post(
        "https://travelatease-5e3f78deebae.herokuapp.com/api/make-booking",
        {
          tourID: tour.tourID,
          providedFullName: credentials.fullName,
          providedEmail: credentials.userEmail,
          providedPhone: credentials.phone,
          guests: credentials.guestSize,
          totalPrice: totalAmount,
          userID: userID,
          withdraw: credentials.withdraw,
        }
      );

      console.log("Booking successful:", response.data);
      navigate("/payment");
    } catch (error) {
      console.error("Error making booking:", error.response.data);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleCheckoutAndBooking();
  };

  const serviceFee = 25;
  const subTotal = Number(price) * Number(credentials.guestSize);
  const totalAmount =
    Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="bi bi-star-fill"></i>
          {avgRating === 0 ? null : avgRating} {/* ({reviews?.length}) */}
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking_form">
        <h4>Contact Details</h4>
        {/* Booking Information */}
        <form className="booking_info" onSubmit={handleClick}>
          <FormGroup>
            <Label htmlFor="">Full Name:</Label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={credentials.fullName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone:</Label>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={credentials.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="userEmail">Email:</Label>
            <input
              type="email"
              id="userEmail"
              placeholder="Email"
              value={credentials.userEmail}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <div className="booking_form">
            <h4>Booking Summary</h4>
          </div>
          <FormGroup className="">
            <Label htmlFor="tour">Tour Date:</Label>
            <span> {tour.tourDate}</span>
            <br></br>
            <Label htmlFor="">Guests:</Label>
            <div className="d-flex align-items-center">
              <Button type="button" color="primary" onClick={handleDecrement}>
                -
              </Button>
              <input
                type="text"
                name="guests"
                value={credentials.guestSize}
                readOnly
                className="text-center"
              />
              <Button type="button" color="primary" onClick={handleIncrement}>
                +
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
      {/* Booking Information */}

      {/* Booking Price */}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="bi bi-x-lg"></i> {credentials.guestSize}
              {credentials.guestSize > 1 ? "persons" : "person"}
            </h5>
            <span>$ {subTotal}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary_btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
}
