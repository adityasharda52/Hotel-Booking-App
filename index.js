const express = require('express');
const app = express();
const dbConfig = require('./db');
const roomRoute = require('./routes/roomRoute');
const userRoute = require('./routes/userRoute');
const bookingRoute = require('./routes/bookingRoute');
app.use(express.json());
app.use('/api/rooms/',roomRoute);
app.use('/api/users/',userRoute);
app.use('/api/booking/',bookingRoute);

app.listen(5000,()=>{
    console.log("Server started at port 5000")
})