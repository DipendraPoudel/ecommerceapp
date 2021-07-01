const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path')
const cloudinary = require('cloudinary')
const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
// if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
dotenv.config({ path: 'backend/config/config.env' })

if(process.env.NODE_ENV==='DEVELOPMENT'){
    app.use(morgan('dev'));
}


app.use(express.json());
app.use(cookieParser())
app.use(fileUpload());

// setting up config
 cloudinary.config({
     cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
 })


// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');


app.use('/api', products)
app.use('/api', auth)
app.use('/api', payment)
app.use('/api', order)



if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app