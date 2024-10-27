import { useContext } from "react";
import CartContext from "../contexts/CartContext";

export const useFoodAppCart = () => {
  return useContext(CartContext);
};
