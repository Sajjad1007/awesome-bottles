import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="flex gap-2 flex-wrap min-h-8 ml-2">
      {cart.map((bottle, index) => (
        <img
          key={index}
          src={bottle.img}
          alt={bottle.name}
          className="w-8 h-8 rounded-sm"
        ></img>
      ))}
    </div>
  );
};

export default Cart;
