const express = require("express")
const config = require("config")
const userRoutes = require("./routes/user-routes")
const app = express()
const PORT = process.env.PORT || config.get("server.PORT");
app.use(express.json())
app.use("/api/user/", userRoutes)
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(` server has started${PORT}`)
        })
    } catch (e) {
        res.status(500).json({error:e.message})
        process.exit()
    }
}
start()