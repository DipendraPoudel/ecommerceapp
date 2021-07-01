const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected Sucessfully with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase