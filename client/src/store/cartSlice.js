import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {

    addProduct(state, action) {
      const foundIndex = state.cartItems.findIndex((p) => p.id === action.payload.id);
      const availableQuantity = action.payload.quantity;
    
      if (foundIndex > -1) {
        const currentQuantity = state.cartItems[foundIndex].quantity;
        const newQuantity = currentQuantity + 1;
        
        if (newQuantity > availableQuantity) {
          alert("Cannot add more than available quantity");
          // or disable the "Add to Cart" button
          return;
        }
        
        state.cartItems[foundIndex].quantity = newQuantity;
        state.totalAmount += action.payload.price;
      } else {
        if (action.payload.quantity > availableQuantity) {
          console.log("Cannot add more than available quantity");
          // or disable the "Add to Cart" button
          return;
        }
        
        state.cartItems.push({ ...action.payload, quantity: 1 });
        state.totalAmount += action.payload.price;
      }
    },

    
    // decreases the product quantity
    removeQuantity(state, action) {
      const foundIndex = state.cartItems.findIndex((p) => p.id === action.payload);
      if (foundIndex > -1) {
        const foundItem = state.cartItems[foundIndex];
        if (foundItem.quantity > 1) {
          state.cartItems[foundIndex].quantity--;
        } else {
          state.cartItems.splice(foundIndex, 1);
        }
        state.totalAmount -= foundItem.price;
      }
    },
    // removes product from the cart
    removeProduct(state, action) {
      const foundIndex = state.cartItems.findIndex((p) => p.id === action.payload);
      if (foundIndex > -1) {
        const foundItem = state.cartItems[foundIndex];
        state.totalAmount -= foundItem.price * foundItem.quantity;
        state.cartItems.splice(foundIndex, 1);
      }
    },
    // resets the whole cart
    reset(state) {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});
export const { addProduct, removeProduct, addQuantity, removeQuantity, reset } =
  cartSlice.actions;

export const cartActions = cartSlice.actions;

export default cartSlice;
