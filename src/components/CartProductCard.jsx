import React from "react";

const CartProductCard = ({ img, name, quantity, price }) => {
  return (
    <div className="card">
      <img src={img} alt="product-img" />
      <p>{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Price: Rs. {quantity * price}</p>
      <button className="btn btn-effects mb-2">Remove from Cart</button>
    </div>
  );
};

export default CartProductCard;
