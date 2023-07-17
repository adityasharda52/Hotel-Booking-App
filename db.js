const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/24x7_Travel_India";

mongoose.connect(url)
.then(()=>{
    console.log("Connected to database");
})
.catch(()=>{
    console.log("error in connecting the database");
})

module.exports = mongoose;