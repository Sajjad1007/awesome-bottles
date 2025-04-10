import React, { useState } from "react";

const BottleCard = ({ bottle, handleAddToCart, handleRemoveFromCart }) => {
  const { img, name, price, stock } = bottle;
  const [currentStock, setCurrentStock] = useState(stock);

  const handleBuyNow = () => {
    if (currentStock > 0) {
      setCurrentStock(currentStock - 1);
      handleAddToCart(bottle);
    }
  };

  const handleRemove = () => {
    if (currentStock < stock) {
      setCurrentStock(currentStock + 1);
      handleRemoveFromCart(bottle);
    }
  };

  return (
    <div className="border-2 border-teal-800 p-4 rounded-xl text-left">
      <img
        src={img}
        alt={name}
        className="rounded-xl h-72 2xl:h-80 w-96 mb-3"
      />
      <div className="flex flex-col items-start">
        <h3 className="mb-1">
          Name&nbsp;&nbsp;:&nbsp;&nbsp;<span className="font-bold">{name}</span>
        </h3>
        <p className="mb-1">Price&nbsp;&nbsp;:&nbsp;&nbsp;${price}</p>
        <p className="mb-3">
          Available&nbsp;&nbsp;:&nbsp;&nbsp;{currentStock} pcs
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleBuyNow}
          className={`border-[rgba(255,255,255,0.87)] text-[rgba(255,255,255,0.87)] bg-[#242424] w-24 h-10 rounded-lg hover:cursor-pointer border text-sm hover:opacity-70`}
        >
          Buy Now
        </button>
        <button
          onClick={handleRemove}
          className={`border-[rgba(255,255,255,0.87)] text-[rgba(255,255,255,0.87)] bg-[#242424] w-24 h-10 rounded-lg hover:cursor-pointer border text-sm hover:opacity-70`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default BottleCard;
