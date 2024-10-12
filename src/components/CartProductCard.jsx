import React from "react";

const CartProductCard = ({
  productId,
  img,
  name,
  quantity,
  price,
  removeProductFromCart,
}) => {
  return (
    <div className="card">
      <img src={img} alt="product-img" />
      <p>{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Price: Rs. {quantity * price}</p>
      <button
        onClick={() => removeProductFromCart(productId)}
        className="btn btn-effects btn-effects-danger mb-2"
      >
        Remove from Cart
      </button>
    </div>
  );
};

export default CartProductCard;
