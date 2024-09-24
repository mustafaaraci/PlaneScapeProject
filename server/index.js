const express = require("express")
const cors = require("cors")
const app = express();
require('./db');
const port = process.env.VITE_PORT ||  5001
const flightRoute = require("./routes/flightRoute");

//middleware
app.use(express.json());
app.use(cors());


//route
app.use("/api/flights",flightRoute);




//serverı ayağa kaldırıyoruz

app.listen(port,()=>{
    console.log(`PLANE SCAPE SERVERI ${port} PORTUNDA BAŞARIYLA AYAĞA KALMAKTADIR. 🔥🔥🔥`);
    
})