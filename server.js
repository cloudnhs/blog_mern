const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


const app = express();


const dbAddress = "mongodb+srv://admin:12345@cluster0.jfhyl.mongodb.net/blog?retryWrites=true&w=majority"

const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbAddress, options)
    .then(() => console.log("MONGODB connected..."))
    .catch(err => console.log(err.message));

// 미들웨어
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//

const PORT = 7000;

app.listen(PORT, console.log('server start at ' + PORT));