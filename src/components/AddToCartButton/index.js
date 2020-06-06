import React, { useContext } from "react";
//import StoreContext from "~/context/store";

const AddToCartButton = (props) => {
  //console.log(props);
  return (
    <button
      className="bg-transparent border-0 text-decoration-none text-dark josefin-sans-b"
      style={{ fontSize: "1rem", outline: "none" }}
    >
      <span>
        <i className="fa fa-refresh pr-2"></i>Add To Cart
      </span>
    </button>
  );
};
export default AddToCartButton;
