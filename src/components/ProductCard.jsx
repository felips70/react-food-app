import React from "react";

const ProductCard = ({ img, name, price }) => {
  return (
    <div className="card">
      <img src={img} alt="product-image" />
      <p>{name}</p>
      <p>Rs. {price}</p>
      <div className="d-flex gap-2">
        <button className="quantity-btn btn-effects">-</button>
        <span>0</span>
        <button className="quantity-btn btn-effects">+</button>
      </div>
      <button className="btn btn-effects mb-2">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
