import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllFlights = createAsyncThunk(
  "flights/getAllFlights",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/flights/getAllFlights"
      );
      console.log("Aldığımız uçuş verileri:", response.data);
      return response.data.flights;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

//burası slice
export const FlightProductSlice = createSlice({
  name: "flights",
  initialState: {
    Flights: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.Flights = action.payload;
      })
      .addCase(getAllFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default FlightProductSlice.reducer;
