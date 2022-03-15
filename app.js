const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('./dbConnection/Connectiondb')
const customerRoute= require('./routes/User')
const productRoute = require('./routes/Product')
const contactRoute = require('./routes/contact')
// const profileRoute = require('./routes/profileRoute')
// const categoryRoute = require('./routes/category')
const AdminRoute = require('./routes/Admin')
const log = require('./middleware/log')
const app = express()
const path = require("path")


const bodyParser = require("body-parser")
const { verifyUser, verifyBuyer, verifyAdmin } = require('./middleware/auth')

app.use(express.static(path.join(__dirname,'files')));

//for express engine 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors())
app.use(log)
// app.use('/user/profile',verifyBuyer,profileRoute)
app.use('/admin', verifyUser, verifyAdmin,AdminRoute)
app.use(customerRoute)
app.use(productRoute)
// app.use(categoryRoute)

app.use(contactRoute)


app.listen(90)// to configure the server
