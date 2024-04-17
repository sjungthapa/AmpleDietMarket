const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/AmpleDietMarket')
    .then(con => {
      console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch(error => {
      console.error('MongoDB connection error:', error);
    });
}

module.exports = connectDatabase;
