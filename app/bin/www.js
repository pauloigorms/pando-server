require('rootpath')();
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const jwt = require('./../helpers/jwt/jwt');
const errorHandler = require('./../helpers/error/error-handler');
const cors = require('cors');

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,OPTIONS,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Authorization");
    next();
});
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./../controllers/users'));
app.use('/tests', require('./../controllers/tests'));
app.use('/response', require('./../controllers/response'));
// app.use('/static', express.static('./assets'));

// global error handler
app.use(errorHandler);

// start server
//const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
//"mongo_connection": "mongodb://localhost:27017/rdb",mongodb+srv://residuum-sys:residuum2019@cluster0-kwige.mongodb.net/test?retryWrites=true
const port = process.env.PORT || 443;
const host = '0.0.0.0'
app.listen(port, host, function () {
    console.log('server-listening-on-port[::: ' + port + ' :::]');
});
