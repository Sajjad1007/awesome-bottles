import React, { use, useEffect, useState } from "react";
import BottleCart from "./BottleCart";
import BottleCard from "./BottleCard";
import {
  addItemIdToLocalStorageCart,
  removeItemIdFromLocalStorage,
  removeAllFromLocalStorage,
} from "../utilities/localStorage";

window.onload = removeAllFromLocalStorage();

const Bottles = ({ bottlesPromise }) => {
  const bottles = use(bottlesPromise);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = [];
    let totalCartPrice = 0;
    let localStorageCart = JSON.parse(localStorage.getItem("cart"));
    localStorageCart = localStorageCart ? localStorageCart : [];

    for (const id of localStorageCart) {
      const bottle = bottles.find((bottle) => bottle.id === id);

      if (bottle) {
        storedCart.push(bottle);
        totalCartPrice += bottle.price;
      }
    }
    setCart(storedCart);
    setTotalPrice(totalCartPrice);
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    setTotalPrice(totalPrice + bottle.price);
    addItemIdToLocalStorageCart(bottle.id);
  };

  const handleRemoveFromCart = (bottle) => {
    const index = cart.indexOf(bottle);

    if (index !== -1) {
      cart.splice(index, 1);
      const newCart = [...cart];
      setCart(newCart);
      setTotalPrice(totalPrice - bottle.price);
      removeItemIdFromLocalStorage(bottle.id);

      if (newCart.length === 0) {
        removeAllFromLocalStorage();
      }
    }
  };

  return (
    <div className="text-center max-w-96 sm:max-w-none mx-auto">
      <div className="sticky top-0 z-10 bg-[#242424] py-5">
        <h2 className="text-4xl font-bold mb-3">Total Price : {totalPrice}</h2>
        <h2 className="text-3xl font-bold flex justify-center items-center max-w-full">
          <div>Bottle Cart : </div>
          <BottleCart cart={cart}></BottleCart>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8 min-w-full mb-4">
        {bottles.map((bottle) => (
          <BottleCard
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          ></BottleCard>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
