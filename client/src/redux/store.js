import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./FlightProductSlice";
import myFlightsReducer from "./MyFlightSlice";

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    myflights: myFlightsReducer,
  },
});
