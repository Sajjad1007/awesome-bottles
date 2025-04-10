const addItemIdToLocalStorageCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart ? cart : [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const removeItemIdFromLocalStorage = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(cart.indexOf(id), 1);

  if (cart.length === 0) {
    localStorage.removeItem("cart");
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const removeAllFromLocalStorage = () => {
  localStorage.removeItem("cart");
};

export {
  addItemIdToLocalStorageCart,
  removeItemIdFromLocalStorage,
  removeAllFromLocalStorage,
};
