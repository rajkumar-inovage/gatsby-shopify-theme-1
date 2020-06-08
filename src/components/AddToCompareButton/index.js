import React, { useContext, useState } from "react";
import StoreContext from "~/context/store";
import { Modal } from "reactstrap";

const AddToCompareButton = ({
  classNameWrapper,
  classNameButton,
  buttonStyle,
  buttonText,
  showIcon,
  iconClassName,
  product,
  rating,
}) => {
  const isBrowser = typeof window !== "undefined";
  const {
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product;
  const variant = { ...initialVariant };
  const { addVariantToCart, client } = useContext(StoreContext);
  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant;
  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(productVariant.price);
  const available = variant.availableForSale;
  const [compareData, setCompareData] = useState(
    isBrowser && localStorage.getItem("compareData")
      ? JSON.parse(localStorage.getItem("compareData"))
      : []
  );
  const [compareModal, setCompareModal] = useState(false);
  const toggleCompareModal = () => setCompareModal(!compareModal);
  const externalCloseBtn = (
    <button
      className="btn btn-transparent p-3 p-lg-4"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={toggleCompareModal}
    >
      <span className="cross-bar">&nbsp;</span>
      <span className="cross-bar">&nbsp;</span>
    </button>
  );
  const removeFromCompare = (e, id) => {
    e.preventDefault();
    let compareData =
      isBrowser && localStorage.getItem("compareData")
        ? JSON.parse(localStorage.getItem("compareData"))
        : [];
    if (compareData.length) {
      var removedData = compareData.filter(function(data, index) {
        return data.id !== id;
      });
      localStorage.setItem("compareData", JSON.stringify(removedData));
      setCompareData(removedData);
      if (removedData.length === 0) {
        toggleCompareModal();
      }
    }
  };
  const addToCartCompared = (e, productVariant) => {
    e.preventDefault();
    addVariantToCart(productVariant.shopifyId, 1);
  };
  const addToCompare = () => {
    let add2compare =
      isBrowser && localStorage.getItem("compareData")
        ? JSON.parse(localStorage.getItem("compareData"))
        : [];
    const compareIndex = add2compare.findIndex((compareProduct) => {
      return compareProduct.id === product.shopifyId;
    });
    if (compareIndex === -1) {
      const pushData = {
        id: product.shopifyId,
        productVariant: productVariant,
        image: product.images[0].localFile.childImageSharp.fluid.src,
        name: product.title,
        price: price,
        rating: rating,
        available: available,
        weight: `${product.variants[0].weight} ${product.variants[0].weightUnit}`,
        sku: product.variants[0].sku,
      };
      add2compare.push(pushData);
      localStorage.setItem("compareData", JSON.stringify(add2compare));
      setCompareData([...compareData, pushData]);
    }
    toggleCompareModal();
  };
  return (
    <div className={classNameWrapper}>
      <button
        className={classNameButton}
        style={buttonStyle}
        onClick={addToCompare}
      >
        <span>
          {showIcon && <i className={iconClassName}></i>}
          {buttonText}
        </span>
      </button>
      <Modal
        className="mx-auto"
        isOpen={compareModal}
        toggle={toggleCompareModal}
        size="xl"
        contentClassName="rounded-0"
        centered={true}
        external={externalCloseBtn}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 700 }}
      >
        <div className="modal-body p-0">
          <div className="h1 modal-title d-block text-center josefin-sans-b">
            Compare products
          </div>
          <div className="py-4">
            <div className="row no-gutters">
              <div className="col-3">
                <ul
                  className="list-group text-center josefin-sans-b"
                  style={{ borderRight: "6px solid #000" }}
                >
                  <li className="list-group-item border-top-0 border-left-0 rounded-0">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "100px" }}
                    >
                      Image
                    </div>
                  </li>
                  <li className="list-group-item border-top-0 border-left-0 px-1 px-lg-3">
                    Name
                  </li>
                  <li className="list-group-item border-top-0 border-left-0 px-1 px-lg-3">
                    Price
                  </li>
                  <li className="list-group-item border-top-0 border-left-0 px-1 px-lg-3">
                    Rating
                  </li>
                  <li className="list-group-item border-top-0 border-left-0 px-1 px-lg-3">
                    Availability
                  </li>
                  <li className="list-group-item border-top-0 border-left-0 px-1 px-lg-3">
                    Weight
                  </li>
                  <li className="list-group-item border-top-0 border-left-0 px-1 px-lg-3">
                    SKU
                  </li>
                  <li className="list-group-item border-0 rounded-0">&nbsp;</li>
                </ul>
              </div>
              {compareData
                .slice(0)
                .reverse()
                .map(
                  (
                    {
                      id,
                      productVariant,
                      image,
                      name,
                      price,
                      rating,
                      available,
                      weight,
                      sku,
                    },
                    index
                  ) => {
                    let output = null;
                    if (index < 4) {
                      output = (
                        <div className="col" data={index} key={index}>
                          <ul className="list-group text-center">
                            <li className="list-group-item border-top-0 border-left-0 border-right-0 rounded-0">
                              <button
                                className="float-right remove-btn border"
                                style={{ borderRadius: "50%" }}
                                onClick={(e) => removeFromCompare(e, id)}
                              >
                                &times;
                              </button>
                              <img
                                src={image}
                                alt={name}
                                className="img-fluid"
                                style={{ maxHeight: "100px" }}
                              />
                            </li>
                            <li className="list-group-item border-top-0 border-left-0 border-right-0 josefin-sans">
                              {name}
                            </li>
                            <li className="list-group-item border-top-0 border-left-0 border-right-0 josefin-sans">
                              {price}
                            </li>
                            <li className="list-group-item border-top-0 border-left-0 border-right-0 josefin-sans">
                              {rating !== 0 ? rating : "No Reviews Yet"}
                            </li>
                            <li className="list-group-item border-top-0 border-left-0 border-right-0 josefin-sans">
                              {available ? "In Stock" : "Out of Stock"}
                            </li>
                            <li className="list-group-item border-top-0 border-left-0 border-right-0 josefin-sans">
                              {weight !== "" ? weight : <>&nbsp;</>}
                            </li>
                            <li className="list-group-item border-top-0 border-left-0 border-right-0 josefin-sans">
                              {sku !== "" ? sku : <>&nbsp;</>}
                            </li>
                            <li className="list-group-item border-bottom-0 border-left-0 border-right-0 rounded-0">
                              <button
                                className="josefin-sans-b"
                                onClick={(e) =>
                                  addToCartCompared(e, productVariant)
                                }
                              >
                                Add To Cart
                              </button>
                            </li>
                          </ul>
                        </div>
                      );
                    }
                    return output;
                  }
                )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AddToCompareButton;
