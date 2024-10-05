import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import DishesContext from "../contexts/Dishes";
import ProductCard from "../components/ProductCard";

const Food = () => {
  const dishes = useContext(DishesContext);

  return (
    <>
      <NavBar />
      <div className="m-3-6">
        <h2 className="text-center my-4">Food</h2>
        <ul className="filters horizontal-center">
          <li>
            <button className="btn btn-effects">All</button>
          </li>
          <li>
            <button className="btn btn-effects">Food</button>
          </li>
          <li>
            <button className="btn btn-effects">Drinks</button>
          </li>
        </ul>
        <div className="my-4 d-flex justify-content-center flex-wrap gap-5">
          {dishes.map(({ _id, img, name, price }) => (
            <ProductCard key={_id.$oid} img={img} name={name} price={price} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Food;
