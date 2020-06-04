import React, {
  useContext,
  useState,
  useEffect,
} from "react"; /* eslint-disable */
import SEO from "../components/seo";
import { graphql } from "gatsby";
import ProductInfo from "../components/productInfo";
import StoreContext from "../context/store";
import VariantSelectors from "../components/variantSelectors";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Flex, Box } from "rebass";
import styled from "styled-components";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ReactHtmlParser from 'react-html-parser'



const ThumbnailBox = styled(Box)(() => ({
  transition: "0.5s ease all",
  cursor: "pointer",
}));

const ThumbnailFlex = styled(Flex)(() => ({
  transition: "0.5s ease all",
}));

const productPage = ({ data }) => {
  const product = data.shopifyProduct;
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product.variants[0]);
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const context = useContext(StoreContext);
  const productVariant =
    context.client.product.helpers.variantForOptions(product, variant) ||
    variant;
  const [available, setAvailable] = useState(productVariant.availableForSale);
  const notificationDOMRef = React.createRef();

  useEffect(() => {
    let defaultOptionValues = {};
    product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0];
    });
    setVariant(defaultOptionValues);
  }, []);

  useEffect(() => {
    checkAvailability(product.shopifyId);
  }, [productVariant]);

  const checkAvailability = (productId) => {
    context.client.product.fetch(productId).then((product) => {
      // this checks the currently selected variant for availability
      const result = product.variants.filter(
        (variant) => variant.id === productVariant.shopifyId
      );
      setAvailable(result[0].available);
    });
  };
  const addNotification = () => {
    store.addNotification({
      title: "Just added to your cart 😊",
      message: `${product.title} / ${productVariant.title}`,
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismissable: { click: true },
      dismiss: { duration: 4000 },
    });
  };

  const handleAddToCart = () => {
    context.addVariantToCart(productVariant.shopifyId, quantity);
    addNotification();
  };

  const handleAddToCart_BuyNow = () => {
    context.addVariantToCartAndBuyNow(productVariant.shopifyId, quantity);
  };

  const handleOptionChange = (event) => {
    const { target } = event;
    setVariant((prevState) => ({
      ...prevState,
      [target.name]: target.value,
      ...console.log(variant),
    }));
  };

  function increaseQuantity() {
    setQuantity((q) => q + 1);
  }

  function decreaseQuantity() {
    setQuantity((q) => (q <= 1 ? 1 : q - 1));
  }

  return (
    <>
      <SEO title={product.title} />
      <ReactNotification ref={notificationDOMRef} />
      <section className="is-fullheight-with-navbar mt-5">
        <div className="hero-body mt-5" style={{ display: "block" }}>
          <div className="container">
            <Flex
              className="box border-none"
              style={{boxShadow:"none"}}
              flexDirection={["column", null, "row"]}
             
            >
              <Box
                width={[1 / 2, null, 0.5 / 5]}
                py={2}
                px={[2, null, 0]}
                order={[2, null, 1]}
                style={{boxShadow:'none',}}
                //flexDirection={['row', null, 'column']}
              >
                <Box width={1} aria-hidden style={{ overflow: "auto" }} style={{boxShadow:'none',}}>
                  <ThumbnailFlex flexDirection={["row", null, "column"]}>
                    {product.images.map((x, i) =>
                      currentImage === product.images[i] ? (
                        <ThumbnailBox
                          key={i}
                          style={{
                            marginBottom: "10px",
                            border: "3px solid black",
                          }}
                          width={["400px", null, "auto"]}
                          ml={[0, null, 2]}
                          mr={[2, null, 0]}
                          my={1}
                        >
                          <Img
                            fluid={x.localFile.childImageSharp.fluid}
                            alt={product.title}
                            loading="auto"
                            imgStyle={{
                              WebkitFilter: "blur(1px)",
                              marginBorder: "10px solid black",
                            }}
                          />
                        </ThumbnailBox>
                      ) : (
                        <ThumbnailBox
                          onMouseOver={(e) =>
                            setCurrentImage(product.images[i])
                          }
                          style={{ marginBottom: "10px" }}
                          key={i}
                          width={["400px", null, "auto"]}
                          ml={[0, null, 2]}
                          mr={[2, null, 0]}
                          my={1}
                        >
                          <Img
                            fluid={x.localFile.childImageSharp.fluid}
                            loading="auto"
                            durationFadeIn={500 * i}
                            alt={product.title}
                          />
                        </ThumbnailBox>
                      )
                    )}
                  </ThumbnailFlex>
                </Box>
              </Box>
              <Box
                width={[5 / 5, null, 3 / 5]}
                style={{ margin: "auto", marginTop: "0" }}
                ml="auto"
                py={2}
                px={[2, null, 3]}
                order={[1, null, 2]}
                style={{boxShadow:'none',}}
                className="img-hover-zoom--zoom-n-rotate img-hover-zoom"
              >
                <Img
                  fluid={currentImage.localFile.childImageSharp.fluid}
                  key={currentImage.localFile.id}
                  alt={product.title}
                  className="imgProduct"
                />
              </Box>
              <Box
                flexDirection="column"
                width={[1, null, 2 / 5]}
                px={2}
                data-product-info
                order={3}
                style={{boxShadow:'none',}}
                className="test"
              >
                <div className="box">
                  <ProductInfo product={product} />
                  {product.options.map((options) => (
                    <VariantSelectors className="josefin-sans"
                      onChange={handleOptionChange}
                      key={options.id.toString()}
                      options={options}
                    />
                  ))}
                  <div
                    className="field is-horizontal mt-5 d-flex"
                    style={{ marginTop: "10px" }}
                  >
                    <div className="field-label is-normal w-100">
                      <label className="label josefin-sand-sb d-block d-lg-flex" style={{ position: "absolute" }}>
                        Quantity :
                      </label>
                    </div>
                    <div className="field-body w-100">
                      <div className="field has-addons select-qnty">
                        <div className="control">
                          <button
                            className="ris ri-minus minus"
                            onClick={decreaseQuantity}
                          >
                            -
                          </button>
                        </div>
                        <div className="control">
                          <span className="px-3 josefin-sans-sb">{quantity}</span>
                        </div>
                        <div className="control">
                          <button
                            className="ris ri-plus plus"
                            onClick={increaseQuantity}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                 
                  <a
                    className="mt-5 d-block overflow-hidden w-100 josefin-sans-b py-3 px-5 cart-btn border border-dark btns position-relative text-uppercase text-center"
                    type="submit"
                    disabled={!available}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </a>
                  <a
                    className="josefin-sans-b w-100 mt-3 mt-lg-5 py-3 px-4 d-block w-100 text-center"
                    style={{fontSize:'1rem', color:'#000', backgroundColor:'#ffcc33', border:'1px solid #ffcc33', transition:'all 0.3s'}}
                    type="submit"
                    disabled={!available}
                    onClick={handleAddToCart_BuyNow}
                  >
                    Buy It Now
                  </a>
                 
                  <div
                    key={`body`}
                    id="content"
                    className="content josefin-sans d-none"
                  />
                  {ReactHtmlParser(product.descriptionHtml)}
                </div>
              </Box>
            </Flex>
          </div>
        </div>
      </section>
      
      
      
    </>
  );
};
productPage.propTypes = {
  addVariantToCart: PropTypes.func,
};
export default productPage;

export const query = graphql`
  query($id: String!) {
    shopifyProduct(handle: { eq: $id }) {
      handle
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`;
