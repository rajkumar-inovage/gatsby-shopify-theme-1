import React, { useContext } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Container, Row, Col } from "reactstrap";
import StoreContext from "~/context/StoreContext";

const RecentProducts = () => {
  const {
    store: { checkout }
  } = useContext(StoreContext);
  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(limit: 8, skip: 1) {
          nodes {
            id
            handle
            title
            images {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
              originalSrc
            }

            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `
  );

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : "CAD",
      minimumFractionDigits: 2,
      style: "currency"
    }).format(parseFloat(price ? price : 0));

  return (
    <Container>
      <Row className="m-0 text-center">
        <h2
          className="josefin-sans-b w-100 mb-2"
          style={{ fontSize: "1.8rem", color: "#000" }}
        >
          Trending Products
        </h2>
        <p className="josefin-sans w-100" style={{ fontSize: "1.2rem" }}>
          What our customers are in love with right now
        </p>
      </Row>
      <Row className="mx-0 mt-5">
        {allShopifyProduct.nodes ? (
          allShopifyProduct.nodes.map(
            ({ id, title, handle, images: [firstImage], priceRange }) => (
              <Col className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-5">
                <div className="trending-products" key={id}>
                  <Link to={`/products/${handle}/`} className="">
                    <div
                      className="tp-image"
                      style={{
                        backgroundImage: `url(${firstImage &&
                          firstImage.localFile &&
                          firstImage.localFile.childImageSharp.fluid.src})`
                      }}
                    >
                      <div className="add-to-cart d-inline w-auto p-0">
                        <button
                          className="tooltips border border-dark btns quick-view position-relative"
                          style={{ fontSize: "0.8rem" }}
                        >
                          <i className="fa fa-eye"></i>
                        </button>

                        <button
                          className="josefin-sans-b cart-btn border border-left-0 border-dark btns position-relative"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </Link>

                  <div className="tp-details">
                    <div className="review-and-price d-block mt-3">
                      <span className="star-value d-inline-block w-50 pl-2 pl-lg-3">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </span>
                      <span
                        className="price josefin-sans-sb d-inline-block text-right w-50 pr-2 pr-lg-3"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {getPrice(priceRange.maxVariantPrice.amount)}
                      </span>
                    </div>
                    <Link
                      to={`/products/${handle}/`}
                      className="josefin-sans-sb mt-2 d-block"
                      style={{ textDecoration: "none" }}
                    >
                      <h3
                        className=""
                        style={{ fontSize: "1.8rem", color: "#000" }}
                      >
                        {title}
                      </h3>
                    </Link>
                  </div>
                </div>
              </Col>
            )
          )
        ) : (
          <p>No Products found!</p>
        )}
      </Row>
    </Container>
  );
};

export default RecentProducts;
