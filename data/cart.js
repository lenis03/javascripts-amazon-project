export let cart = JSON.parse(localStorage.getItem('cart')) || [];
// Stores active timeout IDs for "Added to Cart" messages
// Key: productId, Value: timeoutId
const addedMessageTimeouts = {};

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
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

function getSelectedQuantity(productId) {
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  return Number(quantitySelector.value);
}

export function updateCartQuantityDOM() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function addToCart(productId) {
  const quantity = getSelectedQuantity(productId);
  const matchingItem = findMatchingItem(productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  updateCartQuantityDOM();
  saveToStorage()
}

export function showAddedToCartMessage(productId) {
  const addedToCart = document.querySelector(
    `.js-added-to-cart-${productId}`
  );

  addedToCart.classList.add('added-to-cart-visible');

  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedToCart.classList.remove('added-to-cart-visible');
  }, 2000);

  addedMessageTimeouts[productId] = timeoutId;
}

export function removeFromCart(productId) { 
  let newCart = [];
    cart.forEach((item) => {
      if (item.productId !== productId) {
        newCart.push(item);
      }
  })
  cart = newCart;
  saveToStorage();
}