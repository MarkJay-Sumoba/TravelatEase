import "../styles/SearchBar.css";
import React, { useState } from "react";
import { Form, FormGroup, Input, Col, Button } from "reactstrap";

export default function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState("");
  const [travellers, setTravellers] = useState("");
  const [price, setPrice] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchCriteria = {
      destination,
      // tourDate,
      travellers,
      price,
    };
    onSearch(searchCriteria);
  };
  return (
    <Col>
      <div className="search_bar">
        <Form
          className="d-flex align-items-center gap-4"
          onSubmit={handleSearch}
        >
          {/* Destination */}
          <FormGroup className="d-flex gap-3 form_group form_group-first">
            <span>
              <i className="bi bi-globe-asia-australia"></i>
            </span>
            <div>
              <h6>Destination</h6>
              <Input
                type="text"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              ></Input>
            </div>
          </FormGroup>

          {/* Group size */}
          <FormGroup className="d-flex gap-3 form_group form_group-last">
            <span>
              <i className="bi bi-people-fill"></i>
            </span>
            <div>
              <h6>Travellers</h6>
              <Input
                type="number"
                placeholder="Guests"
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
              ></Input>
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form_group form_group-last">
            <span>
              <i class="bi bi-currency-dollar"></i>
            </span>
            <div>
              <h6>Price Range: {price}</h6>
              <Input
                type="range"
                max={500}
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </FormGroup>

          <Button className="filter_search primary_btn" type="submit">
            <i class="bi bi-search"></i>
          </Button>
        </Form>
      </div>
    </Col>
  );
}
