const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, 
    { 
        useCreateIndex: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
mongoose.Promise = global.Promise;

module.exports = { User: require('./../../schemas/users') };
