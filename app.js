require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const siswaRouter = require("./api/siswa/siswa.router");
const petugasRouter = require("./api/petugas/petugas.router");
const kelasRouter = require("./api/kelas/kelas.router");
const sppRouter = require("./api/spp/spp.router");
const transaksiRouter = require("./api/transaksi/transaksi.router");
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/api/siswa", siswaRouter)
app.use("/api/petugas", petugasRouter)
app.use("/api/kelas", kelasRouter)
app.use("/api/spp", sppRouter)
app.use("/api/transaksi", transaksiRouter)

app.listen(process.env.APP_PORT,()=>{
    console.log("running on port"+process.env.APP_PORT)
})