import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"


//verimizi burada çekiyoruz
export const getAllFlights = createAsyncThunk("flights/getAllFlights", async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL, {
            headers: {
                'app_id': import.meta.env.VITE_APP_ID,
                'app_key': import.meta.env.VITE_APP_KEY,
                'ResourceVersion': import.meta.env.VITE_RESOURCE_VERSION,
                'Accept': import.meta.env.VITE_ACCEPT_HEADER,
            }
        })
        return response.data;
    } catch (error) {
        console.error("API kaynaklı bir hata var!", error);
        throw error; 
    }
});



//burada slice oluşturduk
export const FlightProductSlice = createSlice({
    name : "flights",
    initialState :{ 
    flights:[],
    loading: false,
    error:null
},
reducers:{},
extraReducers: (builder) => {
    builder
    .addCase(getAllFlights.pending,(state)=>{
        state.loading = true;
        state.error = null;

    })
    .addCase(getAllFlights.fulfilled,(state,action)=>{
        state.loading = false;
        state.flights = action.payload;
    })
    .addCase(getAllFlights.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })
}

})


export default FlightProductSlice.reducer;