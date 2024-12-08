import { useState, useEffect } from "react";
import CartContext from "../contexts/CartContext";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { SERVER_ENDPOINT } from "../constants";

const CartProvider = ({ children }) => {
  const [foodAppCart, setFoodAppCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo, loading: authLoading } = useAuth();

  useEffect(() => {
    if (userInfo && !authLoading) {
      const foodAppCartByUser = JSON.parse(
        localStorage.getItem("foodAppCartByUser")
      );

      const initialFoodAppCart = foodAppCartByUser
        ? foodAppCartByUser?.[userInfo._id] || null
        : null;

      setFoodAppCart(initialFoodAppCart);
      setLoading(false);
    }
  }, [userInfo, authLoading]);

  if (authLoading) return <div>Loading...</div>;

  const updateFoodAppCart = (productId, quantity) => {
    const foodAppCartByUser = JSON.parse(
      localStorage.getItem("foodAppCartByUser")
    );
    const newUserCart = {
      ...foodAppCartByUser?.[userInfo._id],
      [productId]: quantity,
    };

    localStorage.setItem(
      "foodAppCartByUser",
      JSON.stringify({
        ...foodAppCartByUser,
        [userInfo._id]: newUserCart,
      })
    );

    setFoodAppCart(newUserCart);
  };

  const removeProductFromCart = (productId) => {
    const foodAppCartByUser = JSON.parse(
      localStorage.getItem("foodAppCartByUser")
    );

    // Here we are destructuring the foodAppCartByUser[userInfo._id] object and dynamically assigning the productId
    // to _ in order to separate it from the rest of the object that we want to keep. This is a way of deleting
    // a key:value pair from an object when the key is dynamic
    const { [productId]: _, ...newUserCart } = foodAppCartByUser[userInfo._id];

    localStorage.setItem(
      "foodAppCartByUser",
      JSON.stringify({
        ...foodAppCartByUser,
        [userInfo._id]: newUserCart,
      })
    );

    setFoodAppCart(newUserCart);
  };

  const removeUserCart = () => {
    const foodAppCartByUser = JSON.parse(
      localStorage.getItem("foodAppCartByUser")
    );

    const { [userInfo._id]: _, ...newFoodAppCartByUser } = foodAppCartByUser;

    localStorage.setItem(
      "foodAppCartByUser",
      JSON.stringify(newFoodAppCartByUser)
    );
    setFoodAppCart(null);
  };

  const createOrder = async () => {
    try {
      const foodAppCartByUser = JSON.parse(
        localStorage.getItem("foodAppCartByUser")
      );
      const { [userInfo._id]: userCart, ...newFoodAppCartByUser } =
        foodAppCartByUser;

      const orderDetails = Object.entries(userCart).map(
        ([dishId, quantity]) => ({
          dishId,
          quantity,
        })
      );

      const orderObject = {
        userId: userInfo._id,
        orderDetails,
      };

      await axios.post(
        `${SERVER_ENDPOINT}/api/orders/create-order`,
        orderObject
      );

      localStorage.setItem(
        "foodAppCartByUser",
        JSON.stringify(newFoodAppCartByUser)
      );
      setFoodAppCart(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CartContext.Provider
      value={{
        foodAppCart,
        loading,
        updateFoodAppCart,
        removeProductFromCart,
        removeUserCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
