import { configureStore } from "@reduxjs/toolkit";
import vendorsReducer from "./Vendor.store";

export const store = configureStore({
    reducer: {
        vendors: vendorsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;