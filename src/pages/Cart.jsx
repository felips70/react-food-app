import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import DishesContext from "../contexts/Dishes";
import CartProductCard from "../components/CartProductCard";

const Cart = () => {
  const dishes = useContext(DishesContext);

  const userCart = {
    "653265121011a59bebdb74f1": 3,
    "653265121011a59bebdb74f2": 2,
    "653265121011a59bebdb74f3": 4,
    "653265121011a59bebdb74f4": 5,
  };

  const cartProductKeys = Object.keys(userCart);

  const enrichedUserCart = dishes
    .filter(({ _id }) => cartProductKeys.includes(_id.$oid))
    .map((product) => ({ ...product, quantity: userCart[product._id.$oid] }));

  return (
    <>
      <NavBar />
      <div className="m-3-6">
        <h2 className="text-center my-4">Cart</h2>
        <div className="my-4 d-flex justify-content-center flex-wrap gap-5">
          {enrichedUserCart.map(({ _id, img, name, price, quantity }) => (
            <CartProductCard
              key={_id.$oid}
              img={img}
              name={name}
              price={price}
              quantity={quantity}
            />
          ))}
        </div>
        <button className="btn btn-large btn-effects d-block horizontal-center">
          Make Order
        </button>
      </div>
    </>
  );
};

export default Cart;
