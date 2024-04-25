const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary').v2;

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


// Setting up Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to unhandled Promise Rejections');
    server.close(() => {
        process.exit(1);
    });
});
