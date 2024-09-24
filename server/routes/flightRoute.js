const express = require("express")
const flightModel = require("../models/flightModel");
const router = express.Router();



// Uçuşları listeleme endpoint'i
router.get("/getMyFlights", async (req, res) => {
    try {
        const myFlights = await flightModel.find();
        res.json(myFlights);
    } catch (error) {
        console.error("Uçuşları alma hatası:", error);
        res.status(500).json({ message: "Uçuşlar alınamadı." });
    }
});

// Uçuş ekleme endpoint'i
router.post("/addFlight", async (req, res) => {
    const flightData = req.body;

    try {
        const newFlight = new flightModel({
            flightNumber: flightData.flightNumber,
            destination: flightData.destination,
            departureTime: flightData.departureTime,
            price: flightData.price,
        });

        await newFlight.save();
        res.status(201).json({ message: "Uçuş başarıyla eklendi.", flight: newFlight });
    } catch (error) {
        console.error("Uçuş ekleme hatası:", error);
        res.status(400).json({ message: "Uçuş eklenemedi.", error: error.message });
    }
});
module.exports = router;