import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import DishesContext from "../contexts/Dishes";
import ProductCard from "../components/ProductCard";
import useUserInfo from "../hooks/useUserInfo";
import useFoodAppCart from "../hooks/useFoodAppCart";

const Food = () => {
  const dishes = useContext(DishesContext);
  const [filterBy, setFilterBy] = useState(["food", "beverages"]);
  const { userInfo } = useUserInfo();

  const { loading, foodAppCart, updateFoodAppCart, removeProductFromCart } =
    useFoodAppCart(userInfo.id);

  const handleFilterClick = (filterOption) => {
    switch (filterOption) {
      case "all":
        setFilterBy(["food", "beverages"]);
        break;
      case "food":
        setFilterBy(["food"]);
        break;
      case "beverages":
        setFilterBy(["beverages"]);
        break;
      default:
        setFilterBy(["food", "beverages"]);
        break;
    }
  };

  return (
    <>
      <NavBar />
      <div className="m-3-6">
        <h2 className="text-center my-4">Food</h2>
        <ul className="filters horizontal-center">
          <li>
            <button
              onClick={() => handleFilterClick("all")}
              className="btn btn-effects"
            >
              All
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterClick("food")}
              className="btn btn-effects"
            >
              Food
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterClick("beverages")}
              className="btn btn-effects"
            >
              Beverages
            </button>
          </li>
        </ul>
        <div className="my-4 d-flex justify-content-center flex-wrap gap-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            dishes
              .filter((dish) => filterBy.includes(dish.category))
              .map(({ _id, img, name, price }) => (
                <ProductCard
                  key={_id.$oid}
                  productId={_id.$oid}
                  img={img}
                  name={name}
                  price={price}
                  initialQuantity={foodAppCart?.[_id.$oid] || 0}
                  updateFoodAppCart={updateFoodAppCart}
                  removeProductFromCart={removeProductFromCart}
                />
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default Food;
