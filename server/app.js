const express = require("express")
const config = require("config")
const routes = require("./routes/user-routes")
const app = express()
const PORT = process.env.PORT || config.get("server.PORT");
app.use(express.json())
app.use("/api/", routes)
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(` server has started${PORT}`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit()
    }
}
start()