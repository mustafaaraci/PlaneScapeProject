require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.VITE_DB_URL, {})
  .then(() => {
    console.log("VERİ TABANI BAĞLANTISI BAŞARILIDIR. 🔥🔥🔥");
  })
  .catch((err) => {
    console.log("VERİ TABANI BAĞLANTISI HATALI ⚠️⚠️⚠️", err);
  });
