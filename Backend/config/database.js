const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI); 

const connection = mongoose.connection;

connection.on('error', () => console.log('Error connecting DB'));
connection.on('connected', () => console.log('DB connected'));

module.exports = mongoose;
