require('dotenv').config();
const mongoose = require("mongoose")


mongoose.connect(process.env.VITE_DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true

})
.then(()=>{
    console.log("VERİ TABANI BAĞLANTISI BAŞARILI...")
})
.catch((err)=>{
console.log("VERİ TABANI BAĞLANTISI HATALI",err)
})