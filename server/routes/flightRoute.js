const express = require("express");
const flightModel = require("../models/flightModel");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Schiphol API URL ve anahtar
const flightApiUrl = process.env.VITE_APP_API_URL;
const appKey = process.env.VITE_APP_KEY;
const appId = process.env.VITE_APP_ID;

// Uçuşları almak için endpoint
router.get("/getAllFlights", async (req, res) => {
  try {
    const { direction, flightdate } = req.query;
    const response = await axios.get(flightApiUrl, {
      headers: {
        app_id: appId,
        app_key: appKey,
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightdate,
        flightDirection: direction,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error);

    res.status(500).send("Error fetching flight data");
  }
});

// Veri tabanından uçuşları listeleme endpoint'i
router.get("/getMyFlights", async (req, res) => {
  try {
    const myFlights = await flightModel.find();
    res.json(myFlights);
  } catch (error) {
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
    res
      .status(201)
      .json({ message: "Uçuş başarıyla eklendi.", flight: newFlight });
  } catch (error) {
    console.error("Uçuş ekleme hatası:", error);
    res.status(400).json({ message: "Uçuş eklenemedi.", error: error.message });
  }
});

// Uçuş silme endpoint'i
router.delete("/deleteFlight/:id", async (req, res) => {
  const flightId = req.params.id;

  try {
    const deletedFlight = await flightModel.findByIdAndDelete(flightId);

    if (!deletedFlight) {
      return res.status(404).json({ message: "Uçuş bulunamadı." });
    }

    res.json({ message: "Uçuş başarıyla silindi." });
  } catch (error) {
    console.error("Uçuş silme hatası:", error);
    res.status(500).json({ message: "Uçuş silinemedi." });
  }
});

module.exports = router;
