
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ers_main_sambu');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log('Connected to database ers:: MongoDB');
});

module.exports = db;

