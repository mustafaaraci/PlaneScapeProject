const express = require("express")
const flightModel = require("../models/flightModel");
const router = express.Router();


//veri tabanından uçuşlarımızı burda çağırdığımız endpoint
router.get("/getMyFlights",async (req,res)=>{
    const myflights = await flightModel.find();
    res.json(myflights);
})
//veri tabanına uçuş eklemek istediğimiz endpoint

router.post("/addFlight", async (req, res) => {
    const { flightNumber, destination, departureTime, price } = req.body;

    // Yeni uçuş nesnesi oluştur
    const newFlight = new flightModel({
        flightNumber,
        destination,
        departureTime,
        price
    });

    try {
        // Uçuşu veritabanına kaydet
        await newFlight.save();
        res.status(201).json({ message: "Uçuş başarıyla eklendi.", flight: newFlight });
    } catch (error) {
        console.error("Uçuş ekleme hatası:", error);
        res.status(400).json({ message: "Uçuş eklenemedi." });
    }
});

module.exports = router;