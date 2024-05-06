const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser=require('cookie-parser')
const app = express()
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
const authRouteUser=require('./Routes/AuthRoute')
app.use(express.json())
app.use(express.static("Assets"))
const port = 3000;
app.use(cookieParser());
app.use('/',authRouteUser)





mongoose.connect('mongodb://localhost:27017/Jobs').then((result) => {
    console.log('connect to mongoDB')
}).catch((err) => {
    console.log(err)
});
app.listen(port, () => {
    console.log('server is ruinng')
})