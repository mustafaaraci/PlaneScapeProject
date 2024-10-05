import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk: Kullanıcı uçuş verilerini çekmek için
export const getMyFlights = createAsyncThunk(
  "flights/getMyFlights",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/flights/getMyFlights"
      );
      console.log("Aldığımız uçuş verileri:", response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// Uçuş silme işlemi için async thunk
export const deleteFlight = createAsyncThunk(
  "flights/deleteFlight",
  async (flightId) => {
    await axios.delete(
      `http://localhost:5000/api/flights/deleteFlight/${flightId}`
    );
    return flightId; // Silinen uçuşun ID'sini döndür
  }
);

// Slice
export const MyFlightSlice = createSlice({
  name: "myflights",
  initialState: {
    myFlights: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.myFlights = action.payload;
      })
      .addCase(getMyFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Uçuş silme işlemi
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.myFlights = state.myFlights.filter(
          (flight) => flight._id !== action.payload
        );
      });
  },
});

export default MyFlightSlice.reducer;
