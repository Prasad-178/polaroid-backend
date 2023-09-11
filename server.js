const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')
const searchRouter = require('./routes/search')
const baseRouter = require('./routes/base')
const mongoose = require('mongoose')
const variables = require('./config')
const verifyToken = require('./middleware/verifyToken')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use('/', verifyToken)
app.use('/', baseRouter)
app.use('/user', userRouter)
app.use('/search', searchRouter)

app.get('/505test', (req,res) => {
    res.render('505')
})

app.get('*', (req, res) => {
    res.render('404', {check: true})
})

const url = `mongodb+srv://${variables.username}:${variables.password}@polaroid-db.zodbi3t.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true)
mongoose
.connect(url)
.then(() => {
    app.listen(variables.port, () => {
        console.log("Server live on port 3500")
    })
})
.catch((err) => {
    console.log(err)
})
