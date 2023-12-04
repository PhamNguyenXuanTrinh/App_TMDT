const express = require('express')
const connectDb = require ('./config/connect_db')
const dotenv = require ('dotenv')
const initRouters = require('./routers')


const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/// connect db

connectDb()

initRouters(app)
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT)