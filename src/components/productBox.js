import React from "react";
import { Link } from "gatsby"; /* eslint-disable */
import { Container, Row, Col } from "reactstrap";

const ProductBox = props => {
  const product = props.product;
  return (
    <Col className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-5">
      <div className="trending-products" key={product.node.id}>
        <Link to={`/product/${product.node.handle}`}>
          <div
            className="tp-image"
            style={{
              backgroundImage: `url(${product.node.images[0] &&
                product.node.images[0].localFile &&
                product.node.images[0].localFile.childImageSharp.fluid.src})`
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
              ${product.node.variants[0].price}
            </span>
          </div>
          <Link
            to={`/product/${product.node.handle}`}
            className="josefin-sans-sb mt-2 d-block"
            style={{ textDecoration: "none" }}
          >
            <h3 className="" style={{ fontSize: "1.8rem", color: "#000" }}>
              {product.node.title}
            </h3>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default ProductBox;
