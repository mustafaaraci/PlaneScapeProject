import { configureStore } from "@reduxjs/toolkit"
import flightReducer from "./FlightProductSlice"

export const store = configureStore({
    reducer:{
        flights:flightReducer
    }
})