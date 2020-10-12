const express = require("express")
const config = require("config")
const app = express()
const PORT = process.env.PORT||config.server.PORT;

app.get("/", (req,res)=>{
    res.send("Hello world")
})
app.listen(PORT, ()=>{
    console.log(` server has started${PORT}`)
})