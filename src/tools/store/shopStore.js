import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "../slice/shopSlice";
import userSlice from "../slice/userSlice";


const store = configureStore({
    reducer: {
        shop: shopSlice,
        user: userSlice 
    }
})

export default store;