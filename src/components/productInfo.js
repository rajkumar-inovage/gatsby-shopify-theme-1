import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <>
    
      <p className="has-text-weight-semibold is-size-2 josefin-sans-b">{product.title}</p>
      <p className="has-text-left josefin-sans-sb is-size-5 text-caitalize" >
        {product.variants[0].title}
      </p>
      <p className=" has-text-right has-text-weight-bold is-size-3 py-3 josefin-sans-b">
        ${product.variants[0].price}
      </p>
    </>
  );
};

export default ProductInfo;