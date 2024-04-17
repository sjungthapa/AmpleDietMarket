const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to uncaught Exception');
    process.exit(1);
});

// setting up config file
dotenv.config({path: 'backend/config/config.env'});

//connecting database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandled Promise Rejections');
    server.close(() => {
        process.exit(1);
    });
});
