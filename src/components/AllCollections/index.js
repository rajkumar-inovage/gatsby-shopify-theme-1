import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Row, Col } from "reactstrap";

const AllCollections = () => {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query {
        allShopifyCollection(
          sort: { fields: updatedAt, order: ASC }
        ) {
          nodes {
            title
            handle
            products {
              title
            }
            image {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  return (
    <Row className="mx-0">
      {allShopifyCollection.nodes ? (
        allShopifyCollection.nodes.map(({ title, handle, image, products }) => (
          <Col className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-5">
            <Link to={`/collections/${handle}/`} className="c-img-link">
              <div
                className="collection-image"
                style={{
                  backgroundImage: `url(${image &&
                    image.localFile &&
                    image.localFile.childImageSharp.fluid.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  height: "200px",
                  transition: "transform 2s cubic-bezier(0, 0, 0.44, 1.18)"
                }}
              ></div>
            </Link>
            <div className="collection-data mt-3">
              <Link
                to={`/collections/${handle}/`}
                className="text-dark text-decoration-none"
              >
                <span className="josefin-sans" style={{ fontSize: "1rem" }}>
                  {products.length} Products
                </span>
                <h4
                  className="josefin-sans-b"
                  style={{ fontSize: "1.4rem", color: "#000" }}
                >
                  {title}
                </h4>
              </Link>
            </div>
          </Col>
        ))
      ) : (
        <p>No Products found!</p>
      )}
    </Row>
  );
};

export default AllCollections;
