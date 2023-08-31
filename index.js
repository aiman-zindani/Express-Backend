// const express = require('express')
// const app = express()
// const port = 3000
// const app = require('./app'); // Change the path to your 'app.js' file
const mongoose = require("mongoose")
// require('dotenv').config()
// const port = process.env.SERVER_PORT


const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.SERVER_PORT
const cors = require('cors')
const path = require('path')
const clientPath = path.join(__dirname, './client/dist')





// app.use(express.json());
// app.use('/api', require('./api/users/router'))
// app.use('/api', require('./api/brands/router'))
// // app.use('/api', require('./api/category/router'))
// // app.use('/api', require('./api/mailer/router'))
// app.use('/api', require('./api/orders/router'))
// // app.use('/api', require('./api/products/router'))
// // app.use('/api', require('./api/products/Router'))


// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





// .......................................................

app.use(cors())

app.use(express.json())
app.use('/', express.static(clientPath))
app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/brands/router'))
app.use('/api', require('./api/category/router'))
// app.use('/api', require('./api/products/router'))
app.use('/api', require('./api/products/Router'));
// app.use('/api', require('./api/products/router'))
// app.use('/api', require('./api/orders/router'))
// app.use('/api', require('./api/mailer/router'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))

})





// app.listen(port, () => {
//     console.log(`Example app listening on port ${port} , ${clientPath}`)
// })