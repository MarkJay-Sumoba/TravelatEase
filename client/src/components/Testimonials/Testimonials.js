import "./Testimonials.css";
import React from "react";
import Slider from "react-slick";
import avatar01 from "../../assets/images/avatar-01.jpg";
import avatar02 from "../../assets/images/avatar-02.jpg";
import avatar03 from "../../assets/images/avatar-03.jpg";

const TestimonialItem = ({ text, image, name }) => (
  <div className="testimonial_item">
    <p>{text}</p>
    <div className="d-flex align-items-center gap-5 mt-3">
      <img src={image} className="testimonial_img" alt={`Traveller ${name}`} />
      <div>
        <h5 className="mb-0 mt-3">{name}</h5>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="testimonials_slider">
      <TestimonialItem
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper eget nulla facilisi etiam. Nulla at volutpat diam ut venenatis tellus in"
        image={avatar01}
        name="Traveller 1"
      />
      <TestimonialItem
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper eget nulla facilisi etiam. Nulla at volutpat diam ut venenatis tellus in"
        image={avatar02}
        name="Traveller 2"
      />
      <TestimonialItem
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper eget nulla facilisi etiam. Nulla at volutpat diam ut venenatis tellus in"
        image={avatar03}
        name="Traveller 3"
      />
    </Slider>
  );
}
