import React, { useState } from "react";
import { Container, Row, Col, Tooltip } from "reactstrap";
import { useStaticQuery, graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import s3 from "../assets/img/s3.jpg";
import s4 from "../assets/img/s4.jpg";

export default props => {
  return (
    <section className="collection-banner pt-100">
      <Container>
        <Row className="mx-0">
          <h1>Essentials</h1>
        </Row>
      </Container>
    </section>
  );
};
