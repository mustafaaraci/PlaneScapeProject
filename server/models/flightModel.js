const mongoose = require("mongoose")
const flightSchema = new mongoose.Schema({
    
//veri tabanına kaydolacak uçuş bilgilerini burda model olarak oluşturuyoruz.


flightNumber: { type: String, required: true }, 
destination: { type: String, required: true }, 
departureTime: { type: Date, required: true }, 
price: { type: Number, required: true }



},{timestamps:true});

const flightModel = mongoose.model("flights",flightSchema);
module.exports = flightModel;