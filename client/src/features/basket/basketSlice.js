import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { act } from "react";

const initialState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk(
  "basket/removeBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.removeItem(productId, quantity);
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    // removeItem: (state, action) => {
    //   const { productId, quantity } = action.payload;
    //   const itemIndex = state.basket?.items.findIndex(
    //     (i) => i.productId === productId
    //   );
    //   if (itemIndex === -1 || itemIndex === undefined) return;
    //   state.basket.items[itemIndex].quantity -= quantity;
    //   if (state.basket.items[itemIndex].quantity === 0)
    //     state.basket.items.splice(itemIndex, 1);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      // console.log(action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload)
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket.items[itemIndex].quantity -= quantity;
      if (state.basket.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
      
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

// export const { setBasket, removeItem } = basketSlice.actions;
export const { setBasket } = basketSlice.actions;
