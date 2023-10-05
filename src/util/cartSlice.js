import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeSpecificItem: (state, action) => {
      const itemIdToRemove = action.payload;

      for (let ind = 0; ind < state.items.length; ind++) {
        const item = state.items[ind];
        if (item?.id === itemIdToRemove?.id) {
          state.items.splice(ind, 1);
          break; // Exit the loop once the condition is met
        }
      }
    },
  },
});

export const { addItem, removeItem, clearCart, removeSpecificItem } =
  cartSlice.actions;
export default cartSlice.reducer;
