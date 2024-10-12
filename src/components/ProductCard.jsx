import React, { useState } from "react";
import { displayDissapearingMessage } from "../utility";

const ProductCard = ({
  productId,
  img,
  name,
  price,
  initialQuantity,
  updateFoodAppCart,
  removeProductFromCart,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [goingFromOneToZero, setGoingFromOneToZero] = useState(false);
  const [showItemAddedMessage, setShowItemAddedMessage] = useState(false);
  const [showItemRemovedMessage, setShowItemRemovedMessage] = useState(false);

  const isQuantityEqualToInitialQuantity = initialQuantity === quantity;

  const handleUpdateCart = () => {
    if (goingFromOneToZero) {
      removeProductFromCart(productId);
      setGoingFromOneToZero(false);
      displayDissapearingMessage(setShowItemRemovedMessage, 2500);
    } else {
      updateFoodAppCart(productId, quantity);
      displayDissapearingMessage(setShowItemAddedMessage, 2500);
    }
  };

  const handleSubtract = (prev) => {
    if (prev === 1 && initialQuantity > 0) {
      setGoingFromOneToZero(true);
    }
    return (prev -= 1);
  };

  const handleAdd = (prev) => {
    if (prev === 0 && initialQuantity > 0) {
      setGoingFromOneToZero(false);
    }
    return (prev += 1);
  };

  return (
    <div className="card">
      {showItemAddedMessage && <p className="product-message">Item added</p>}
      {showItemRemovedMessage && (
        <p className="product-message product-message-danger">Item removed</p>
      )}
      <img src={img} alt="product-image" />
      <p>{name}</p>
      <p>Rs. {price}</p>
      <div className="d-flex gap-2">
        <button
          onClick={() => setQuantity(handleSubtract)}
          className="quantity-btn btn-effects btn-effects-danger"
          disabled={quantity === 0}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity(handleAdd)}
          className="quantity-btn btn-effects btn-effects-success"
        >
          +
        </button>
      </div>
      <button
        onClick={handleUpdateCart}
        className={`btn btn-effects btn-effects-${
          goingFromOneToZero ? "danger" : "success"
        } mb-2`}
        disabled={isQuantityEqualToInitialQuantity}
      >
        {goingFromOneToZero ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
