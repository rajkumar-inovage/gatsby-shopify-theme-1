import React from "react";
import AddToCompareButton from "~/components/AddToCompareButton";
const AddToCompare = ({ className, product, rating }) => {
  return (
    <div className={className}>
      <AddToCompareButton
        classNameWrapper="compare col-12 mt-3 mt-lg-4"
        classNameButton="bg-transparent border-0 text-decoration-none text-dark josefin-sans-b"
        buttonStyle={{ fontSize: "1rem", outline: "none" }}
        buttonText="Add To Compare"
        showIcon={true}
        iconClassName="fa fa-refresh pr-2"
        product={product}
        rating={rating}
      />
    </div>
  );
};
export default AddToCompare;
