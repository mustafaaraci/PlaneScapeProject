const express = require("express")
const cors = require("cors")
const app = express();
require('./db');
const port = process.env.VITE_PORT ||  5001
const flightRoute = require("./routes/flightRoute");

//middleware
app.use(express.json());
app.use(cors());



app.use("api/flights",flightRoute);


app.get("/",(req,res)=>{
    res.json({
        message:"HOŞGELDİNİZ"
    })
})



//serverı ayağa kaldırıyoruz

app.listen(port,()=>{
    console.log(`PLANE SCAPE SERVERI ${port} PORTUNDA BAŞARIYLA AYAĞA KALMAKTADIR. 🔥🔥🔥`);
    
})