import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./FlightProductSlice";
import myFlightsReducer from "./MyFlightSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    myflights: myFlightsReducer,
    users: userReducer,
  },
});
