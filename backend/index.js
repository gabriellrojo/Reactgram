const express = require("express")
require("dotenv").config()
const cors = require("cors")
const path = require("path")
const routes = require("./routes/routes")

const server = express()

server.use(express.json())
server.use(express.urlencoded({
    extended: false
}))
server.use(cors({
    credentials: true,
    origin: "http//localhost:3000"
}))
server.use("/uploads", express.static(path.join(__dirname, "/uploads")))
server.use(routes)


const port = process.env.PORT

server.listen(port, () => {
    console.log(`Estou rodando na porta ${port}`)
})