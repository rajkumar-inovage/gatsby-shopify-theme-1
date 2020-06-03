import React from "react";
import { graphql, Link } from "gatsby";
import { Container, Row, Col } from "reactstrap";
import SEO from "~/components/seo";
import ReactHtmlParser from "react-html-parser";

const InnerPages = ({ data }) => {
  return (
    <>
      <SEO title={data.shopifyPage.title} />
      <section
        className="inner-pages-banner py-100"
        style={{ backgroundColor: "#e7e7e7" }}
      >
        <Container className="py-0 py-lg-5">
          <Row className="mx-0">
            <Col className="banner-data text-center col-12 mt-5">
              <div
                className="breadcrump josefin-sans"
                style={{ fontSize: "1.3rem" }}
              >
                <span>
                  {" "}
                  <Link
                    to=""
                    style={{ textDecoration: "none" }}
                    className="text-dark"
                  >
                    {" "}
                    Home
                  </Link>{" "}
                </span>{" "}
                / <span> {data.shopifyPage.title}</span>
              </div>
              <div className="collection-title mt-4 d-inline-flex">
                <h1
                  className="m-0"
                  style={{
                    fontSize: "2.5rem",
                    color: "#000",
                    lineHeight: "24px"
                  }}
                >
                  {data.shopifyPage.title}
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-3 py-lg-5">
        <Container>
          <Row className="mx-0 py-2 py-lg-5">
            <Col className="col-12">
              <div
                className="inner-page-content josefin-sans"
                style={{ fontSize: "1.3rem" }}
              >
                {ReactHtmlParser(data.shopifyPage.body)}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export const query = graphql`
  query($handle: String!) {
    shopifyPage(handle: { eq: $handle }) {
      title
      handle
      body
    }
  }
`;

export default InnerPages;
