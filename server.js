const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotEnv = require('dotenv');
dotEnv.config();



const app = express();

const userRouter = require('./api/routes/user');

// 데이터베이스
require('./config/database');

// 미들웨어
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routing
app.use('/user', userRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log('server start at ' + PORT));