import { createSlice } from "@reduxjs/toolkit";

const foodItemSlice = createSlice({
    name: "theme",
    initialState: {
        allFood: [],
        vegProduct: [],
        nonVegProduct: [],
        cart: [],
        itemToBeEdited: [],
        productCount: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.allFood = action.payload;
        },
        filterVegProduct: (state, action) => {
            if (action.payload === "veg") state.vegProduct = state.allFood.filter(item => item.categoryName === action.payload);
            if (action.payload === "non veg") state.nonVegProduct = state.allFood.filter(item => item.categoryName === action.payload);
        },
        addProductToCart: (state, action) => {
            if (!state.cart.find(item => item.id === action.payload.id)) {
                state.cart.push(action.payload);
                state.productCount++;
            };
        },
        deleteProductFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
            state.productCount--;
        },
        emptyCart: (state) => {
            state.cart = [];
            state.productCount = 0;
        },
        editItem: (state, action) => {
            state.itemToBeEdited = state.allFood.filter(item => item._id === action.payload);
        },
        deleteItem: (state, action) => {
            state.allFood = state.allFood.filter(item => item._id !== action.payload);
        }
    }
});
export const { addProduct, filterVegProduct, addProductToCart, deleteProductFromCart, emptyCart, editItem, deleteItem } = foodItemSlice.actions;
export default foodItemSlice.reducer;