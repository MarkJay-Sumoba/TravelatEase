import React from "react";
import "../styles/CommonSection.css";
import { Container, Row, Col } from "reactstrap";

export default function CommonSection({ title }) {
  return (
    <section className="common_section d-flex align-items-center justify-content-center ">
      <Container>
        <Row>
          <Col lg="12">
            <h1 className="text-center">{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
