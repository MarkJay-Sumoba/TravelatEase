import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Tour.css";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import CommonSection from "../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

export default function Tours() {
  const location = useLocation();
  const searchCriteria = location.state && location.state.searchCriteria;

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const toursPerPage = 8;

  const [allTours, setAllTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);

  useEffect(() => {
    if (searchCriteria) {
      updateFilteredTours(searchCriteria);
    } else {
      axios
        .get("https://travelatease-5e3f78deebae.herokuapp.com//api/tours")
        .then((response) => {
          const toursData = response.data;
          setAllTours(toursData);
          setFilteredTours(toursData);
          setPageCount(Math.ceil(toursData.length / toursPerPage));
        })
        .catch((error) => {
          console.error("Error fetching tours:", error);
        });
    }
  }, [searchCriteria]);

  const updateFilteredTours = (searchCriteria) => {
    const { destination, price, travellers } = searchCriteria;

    const filtered = allTours.filter((tour) => {
      const destinationMatch =
        tour.city.toLowerCase().includes(destination.toLowerCase()) ||
        tour.country.toLowerCase().includes(destination.toLowerCase()) ||
        tour.region.toLowerCase().includes(destination.toLowerCase());

      const availabilityMatch = tour.availability >= travellers;
      const priceMatch = Number(tour.price) <= Number(price);

      return destinationMatch && priceMatch && availabilityMatch;
    });

    // Update filtered tours and reset page to 0
    setFilteredTours(filtered);
    setPage(0);
  };

  const startIdx = page * toursPerPage;
  const endIdx = startIdx + toursPerPage;
  const displayedTours = filteredTours.slice(startIdx, endIdx);

  return (
    <>
      <CommonSection title={"All Tours"} />

      {/* SearchBar */}
      <section>
        <Container>
          <Row>
            <SearchBar onSearch={updateFilteredTours} />
          </Row>
        </Container>
      </section>
      {/* SearchBar */}

      {/* Tour Cards */}
      <section className="pt-0">
        <Container>
          <Row>
            {displayedTours.map((tour) => (
              <Col lg="3" className="mb-4" key={tour.tourID}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>

          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
            {[...Array(pageCount).keys()].map((num) => (
              <span
                key={num}
                onClick={() => setPage(num)}
                className={page === num ? "active_page" : ""}
              >
                {num + 1}
              </span>
            ))}
          </div>
        </Container>
      </section>
      {/* Tour Cards */}
    </>
  );
}
