const mongoose = require('mongoose');

const { DB_STRING } = require('./environment');

exports.dbInit = () => {
    mongoose.connection.on('open', () => console.log('Database is connected...'));

    return mongoose.connect(DB_STRING);
};
