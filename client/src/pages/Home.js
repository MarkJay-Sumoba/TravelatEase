import React from "react";
import "../styles/Home.css";
import SearchBar from "../shared/SearchBar";
import FeaturedTourList from "../components/FeaturedTour/FeaturedTourList";
import Testimonials from "../components/Testimonials/Testimonials";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";

import heroImg from "../assets/images/hero-img01.jpg";
import heroImg01 from "../assets/images/hero-img03.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import Aboutus from "../assets/images/AboutUs.jpg";
import MasonryTemplate from "../components/Gallery/MasonryTemplate";

import Subtitle from "./../shared/Subtitle";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = ({ destination, travellers, price }) => {
    navigate({
      pathname: "/tours",
      state: {
        searchCriteria: {
          destination,
          travellers,
          price: Number(price),
        },
      },
    });
  };
  return (
    <>
      {/*Main Content*/}
      <section>
        <Container>
          <Row>
            {/* Sub header */}
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                </div>
                <h1>Welcome to Travel@Ease</h1>
              </div>
              <p>Discover the World: Your Passport to Extraordinary</p>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-4">
                <img src={heroImg} alt="" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={heroImg01} alt="" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-4">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            {/* End Sub header */}

            {/*Search Bar*/}
            <SearchBar onSearch={handleSearch} />
          </Row>
        </Container>
      </section>
      {/*End Search Bar*/}

      {/*End Main Content*/}

      {/* Tour */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="tour_title">Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* End Tour */}

      {/**Testimonials */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Travellers Log"} />
              <h2 className="testimonial_title">Our Testimonials</h2>
            </Col>
            <Testimonials />
          </Row>
        </Container>
      </section>
      {/**End Testimonials */}

      {/* Travel Us */}
      <section id="aboutus">
        <Container>
          <Row>
            <Col lg="6">
              <div className="about-us_content">
                <Subtitle subtitle={"Travel With Us"} />
                <h3>
                  Your Journey, Our Expertise – Where Every Mile Feels Like a
                  Smile!"
                </h3>
                <br />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="counter_wrapper d-flex align-items-center gap-5">
                <div className="counter_box">
                  <span>9k</span>
                  <h6>SuccessFul Trip</h6>
                </div>
                <div className="counter_box">
                  <span>500+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter_box">
                  <span>10</span>
                  <h6>Years of Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="about-us_img">
                <img src={Aboutus} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* End Travel Us */}

      {/* Gallery */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery_title">Visit Our Traveller's Gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryTemplate />
            </Col>
          </Row>
        </Container>
      </section>
      {/* End Gallery */}
    </>
  );
}
