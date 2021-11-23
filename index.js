const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL/*, {
    newUrlParser: true,
    useCreateIndex: true
}*/)
    .then(() => console.log("Database Connected"))
    .catch(console.error)

const port = process.env.PORT || 3000

const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))


app.use('/admin', adminRoutes)
app.use(userRoutes)


app.listen(port, (req, res) => {
    console.log("Running on port " + port)
})