const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const fs = require('fs')
const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false,
}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

//Routes
app.get('/', (req, res) => {
    
    const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8')); 
    
    //pagination
    const totalRec = Object.keys(data).length
    const pageSize = 6
    const pageCount = Math.ceil(totalRec / pageSize)
    const start = 0
    const currentPage = 1

    if (currentPage > 1) {
        start = (currentPage - 1) * pageSize;
    }

    console.log("pageCount: " + pageCount + " totalRec: " + totalRec + " start: " + start)

    const postList = data.slice(start, start+pageSize)
    console.log("postList: " + postList)    
    
    res.render("index", {
        postList,
        totalRec,
        pageSize,
        pageCount,
        start,
        currentPage
    })
})

//Server
const port = process.env.APP_PORT || 8080
const host = process.env.APP_HOST || "localhost"

app.listen(port, function () {
    console.log("Listening on " + host + ":" + port)
})

module.exports = app
