export let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function findMatchingItem(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  return matchingItem;
}

export function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}

export function addToCart(productId, quantity) {
  const matchingItem = findMatchingItem(productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity(productId, newQuantity) { 
  let matchingItem;
  cart.forEach((item) => {
  if (item.productId === productId) {
    matchingItem = item;
    }
  matchingItem.quantity = newQuantity;
  saveToStorage();

  })
}