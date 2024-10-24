import { useContext } from "react";
import DishesContext from "../contexts/DishesContext";

const useDishes = () => {
  return useContext(DishesContext);
};

export default useDishes;
