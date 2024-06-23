"use client"
import { configureStore } from "@reduxjs/toolkit"
import { apiSlide } from "./features/api/appSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlide.reducerPath]: apiSlide.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlide.middleware),
});


const initializeApp = async()=>{
  await store.dispatch(
    apiSlide.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );
  await store.dispatch(
    apiSlide.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
}

initializeApp()