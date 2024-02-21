const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user')
const searchRouter = require('./routes/search')
const baseRouter = require('./routes/base')
const adminRouter = require('./routes/admin')
const theatreAdminRouter = require('./routes/theatreAdmin')
const mongoose = require('mongoose')
const variables = require('./config')
const verifyToken = require('./middleware/verifyToken')
const cors = require('cors')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

let accessLogStream = rfs.createStream((Date.now() / 1000) + 'access.log', {
    interval: '10s',
    path: path.join(__dirname, 'log')
})

const app = express()

app.use(morgan('tiny'))

app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
    credentials: true
}))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.use('/', verifyToken)
app.use('/', baseRouter)
app.use('/user', userRouter)
app.use('/search', searchRouter)
app.use('/admin', adminRouter)
app.use('/theatreadmin', theatreAdminRouter)

app.get('*', (req, res) => {
    res.render('404', { check: true })
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
