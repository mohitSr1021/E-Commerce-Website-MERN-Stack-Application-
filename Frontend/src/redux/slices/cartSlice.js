import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? parseFloat(localStorage.getItem("totalAmount")).toFixed(2)
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? parseInt(localStorage.getItem("totalQuantity"))
    : 0;

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex === -1) {
        // If item doesn't exist in cart, add it
        state.cartItems.push({
          ...newItem,
          quantity: 1, // Initialize quantity to 1
          totalQuantity: 1, // Initialize total quantity to 1
          totalPrice: parseFloat(newItem.priceUSD).toFixed(2), // Initialize total priceUSD to item's priceUSD
        });
      } else {
        // If item already exists in cart, update its quantity and total priceUSD
        state.cartItems[existingItemIndex].quantity++;
        state.cartItems[existingItemIndex].totalQuantity++;
        state.cartItems[existingItemIndex].totalPrice = (
          parseFloat(state.cartItems[existingItemIndex].totalPrice) +
          parseFloat(newItem.priceUSD)
        ).toFixed(2); // Format to 2 decimal places
      }
      state.totalQuantity++; // Increment total quantity for all items in cart
      state.totalAmount = (
        parseFloat(state.totalAmount) + parseFloat(newItem.priceUSD)
      ).toFixed(2); // Format to 2 decimal places
      updateLocalStorage(state); // Update local storage
    },

    addToBuy: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex === -1) {
        // If item doesn't exist in cart, add it
        state.cartItems.push({
          ...newItem,
          quantity: 1, // Initialize quantity to 1
          totalQuantity: 1, // Initialize total quantity to 1
          totalPrice: parseFloat(newItem.priceUSD).toFixed(2), // Initialize total priceUSD to item's priceUSD
        });
      } else {
        // If item already exists in cart, update its quantity and total priceUSD
        state.cartItems[existingItemIndex].quantity++;
        state.cartItems[existingItemIndex].totalQuantity++;
        state.cartItems[existingItemIndex].totalPrice = (
          parseFloat(state.cartItems[existingItemIndex].totalPrice) +
          parseFloat(newItem.priceUSD)
        ).toFixed(2); // Format to 2 decimal places
      }
      state.totalQuantity++; // Increment total quantity for all items in cart
      state.totalAmount = (
        parseFloat(state.totalAmount) + parseFloat(newItem.priceUSD)
      ).toFixed(2); // Format to 2 decimal places
      updateLocalStorage(state); // Update local storage
    },

    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      const itemToRemoveIndex = state.cartItems.findIndex(
        (item) => item.id === itemIdToRemove
      );
      if (itemToRemoveIndex !== -1) {
        // If item exists in cart, remove it
        state.totalQuantity -= state.cartItems[itemToRemoveIndex].quantity;
        state.totalAmount = (
          parseFloat(state.totalAmount) -
          parseFloat(state.cartItems[itemToRemoveIndex].totalPrice)
        ).toFixed(2); // Format to 2 decimal places
        state.cartItems.splice(itemToRemoveIndex, 1);
      }
      updateLocalStorage(state); // Update local storage
    },

    incrementItemQuantity: (state, action) => {
      const itemIdToIncrement = action.payload;
      const itemToIncrement = state.cartItems.find(
        (item) => item.id === itemIdToIncrement
      );
      if (itemToIncrement) {
        // If item exists in cart, increment its quantity and total priceUSD
        itemToIncrement.quantity++;
        itemToIncrement.totalQuantity++;
        itemToIncrement.totalPrice = (
          parseFloat(itemToIncrement.totalPrice) +
          parseFloat(itemToIncrement.priceUSD)
        ).toFixed(2); // Format to 2 decimal places
        state.totalQuantity++;
        state.totalAmount = (
          parseFloat(state.totalAmount) + parseFloat(itemToIncrement.priceUSD)
        ).toFixed(2); // Format to 2 decimal places
        updateLocalStorage(state); // Update local storage
      }
    },

    decrementItemQuantity: (state, action) => {
      const itemIdToDecrement = action.payload;
      const itemToDecrement = state.cartItems.find(
        (item) => item.id === itemIdToDecrement
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        // If item exists in cart and its quantity is more than 1, decrement its quantity and total priceUSD
        itemToDecrement.quantity--;
        itemToDecrement.totalQuantity--;
        itemToDecrement.totalPrice = (
          parseFloat(itemToDecrement.totalPrice) -
          parseFloat(itemToDecrement.priceUSD)
        ).toFixed(2); // Format to 2 decimal places
        state.totalQuantity--;
        state.totalAmount = (
          parseFloat(state.totalAmount) - parseFloat(itemToDecrement.priceUSD)
        ).toFixed(2); // Format to 2 decimal places
        updateLocalStorage(state); // Update local storage
      }
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      updateLocalStorage(state);
    },
  },
});

const updateLocalStorage = (state) => {
  const cartItems = state.cartItems.slice(); // Create a shallow copy of the cart items array
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalAmount", state.totalAmount);
  localStorage.setItem("totalQuantity", state.totalQuantity.toString()); // Convert to string before storing
};
export const {
  addToCart,
  addToBuy,
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
