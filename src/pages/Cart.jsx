import React, { useMemo, useState } from "react";
import CartProductCard from "../components/CartProductCard";
import { useFoodAppCart } from "../hooks/useFoodAppCart";
import { getEnrichedCart, displayDissapearingMessage } from "../utility";
import EmptyCart from "../components/EmptyCart";
import useDishes from "../hooks/useDishes";
import useAuth from "../hooks/useAuth";

const Cart = () => {
  const [showOrderMadeMessage, setShowOrderMadeMessage] = useState(false);
  const { userInfo } = useAuth();

  const { loading: dishesLoading, dishes } = useDishes();

  const {
    loading: cartLoading,
    foodAppCart,
    removeProductFromCart,
    removeUserCart,
  } = useFoodAppCart(userInfo._id);

  const enrichedUserCart = useMemo(() => {
    return cartLoading || dishesLoading
      ? []
      : getEnrichedCart(dishes, foodAppCart);
  }, [dishes, foodAppCart]);

  const handleMakeOrder = () => {
    removeUserCart();
    displayDissapearingMessage(setShowOrderMadeMessage);
  };

  return (
    <div className="m-3-6 p-relative">
      {showOrderMadeMessage && (
        <p className="product-message product-message-cart">
          Order successfully made!
        </p>
      )}
      <h2 className="text-center my-4">Cart</h2>
      <div className="my-4 d-flex justify-content-center flex-wrap gap-5">
        {cartLoading || dishesLoading ? (
          <div>Loading...</div>
        ) : enrichedUserCart.length === 0 ? (
          <EmptyCart />
        ) : (
          enrichedUserCart.map(({ _id, img, name, price, quantity }) => (
            <CartProductCard
              key={_id}
              productId={_id}
              img={img}
              name={name}
              price={price}
              quantity={quantity}
              removeProductFromCart={removeProductFromCart}
            />
          ))
        )}
      </div>
      {enrichedUserCart.length > 0 && (
        <p className="text-center my-4">
          Total Price: Rs.{" "}
          {enrichedUserCart.reduce(
            (acc, { price, quantity }) => acc + price * quantity,
            0
          )}
        </p>
      )}
      {enrichedUserCart.length > 0 && (
        <button
          onClick={handleMakeOrder}
          className="btn btn-large btn-effects d-block horizontal-center"
        >
          Make Order
        </button>
      )}
    </div>
  );
};

export default Cart;
