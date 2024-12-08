import axios from "axios";
import { useEffect, useState } from "react";
import DishesContext from "../contexts/DishesContext";
import useAuth from "../hooks/useAuth";
import { SERVER_ENDPOINT } from "../constants";

export const DishesProvider = ({ children }) => {
  const { foodAppToken } = useAuth();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDishes = async () => {
    if (foodAppToken) {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_ENDPOINT}/api/dishes`);
        setDishes(response.data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    }
  };

  useEffect(() => {
    fetchDishes();
  }, [foodAppToken]);

  return (
    <DishesContext.Provider value={{ dishes, loading, error }}>
      {children}
    </DishesContext.Provider>
  );
};
