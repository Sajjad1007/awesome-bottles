import React, { use, useEffect, useState } from "react";
import BottleCart from "./BottleCart";
import BottleCard from "./BottleCard";
import {
  addItemIdToLocalStorageCart,
  removeItemIdFromLocalStorage,
  removeAllFromLocalStorage,
} from "../utilities/localStorage";

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
    console.log(index);

    if (index !== -1) {
      cart.splice(index, 1);
      const newCart = [...cart];
      setCart(newCart);
      setTotalPrice(totalPrice - bottle.price);
      removeItemIdFromLocalStorage(bottle.id);
    }
  };

  const handleCrossButton = () => {
    setCart([]);
    setTotalPrice(0);
    removeAllFromLocalStorage();
  };

  return (
    <div className="text-center max-w-96 sm:max-w-none mx-auto">
      <div className="sticky top-0 z-10 bg-[#242424] py-5">
        <h2 className="text-4xl font-bold mb-3">Total Price : {totalPrice}</h2>
        <h2 className="text-3xl font-bold flex justify-center items-center max-w-full">
          <div>Bottle Cart&nbsp;:</div>
          <BottleCart cart={cart}></BottleCart>
          <button
            onClick={handleCrossButton}
            className={`border-[rgba(255,255,255,0.87)] text-[rgba(255,255,255,0.87)] bg-[#242424] w-8 h-8 rounded-sm hover:cursor-pointer border text-sm hover:opacity-70 ${
              cart.length > 0 ? "block ml-2" : "hidden"
            }`}
          >
            X
          </button>
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
