const app = require("./app")
const mongoose = require('mongoose')
const variables = require('./config')

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
