import { configureStore } from '@reduxjs/toolkit'
import foodItemSlice from './foodItemSlice'
const store = configureStore({
    reducer: {
        foodItemSlice
    },
})

export default store