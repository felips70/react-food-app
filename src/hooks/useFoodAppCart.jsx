import { useState, useEffect } from "react";

export const useFoodAppCart = (userId) => {
  const [foodAppCart, setFoodAppCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foodAppCartByUser = JSON.parse(
      localStorage.getItem("foodAppCartByUser")
    );

    const initialFoodAppCart = foodAppCartByUser
      ? foodAppCartByUser?.[userId] || null
      : null;

    setFoodAppCart(initialFoodAppCart);
    setLoading(false);
  }, []);

  const updateFoodAppCart = (productId, quantity) => {
    const foodAppCartByUser = JSON.parse(
      localStorage.getItem("foodAppCartByUser")
    );
    const newUserCart = {
      ...foodAppCartByUser?.[userId],
      [productId]: quantity,
    };

    localStorage.setItem(
      "foodAppCartByUser",
      JSON.stringify({
        ...foodAppCartByUser,
        [userId]: newUserCart,
      })
    );

    setFoodAppCart(newUserCart);
  };

  const removeProductFromCart = (productId) => {
    const foodAppCartByUser = JSON.parse(
      localStorage.getItem("foodAppCartByUser")
    );

    // Here we are destructuring the foodAppCartByUser[userId] object and dynamically assigning the productId
    // to _ in order to separate it from the rest of the object that we want to keep. This is a way of deleting
    // a key:value pair from an object when the key is dynamic
    const { [productId]: _, ...newUserCart } = foodAppCartByUser[userId];

    localStorage.setItem(
      "foodAppCartByUser",
      JSON.stringify({
        ...foodAppCartByUser,
        [userId]: newUserCart,
      })
    );

    setFoodAppCart(newUserCart);
  };

  const removeUserCart = () => {
    const foodAppCartByUser = JSON.parse(
      localStorage.getItem("foodAppCartByUser")
    );

    const { [userId]: _, ...newFoodAppCartByUser } = foodAppCartByUser;

    localStorage.setItem(
      "foodAppCartByUser",
      JSON.stringify(newFoodAppCartByUser)
    );
    setFoodAppCart(null);
  };

  return {
    foodAppCart,
    loading,
    updateFoodAppCart,
    removeProductFromCart,
    removeUserCart,
  };
};
