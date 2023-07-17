const mongoose = require('mongoose');

const bookingschema = mongoose.Schema({
    room :{
        type:String,
        required:true
    },
    roomid:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    fromdate:{
        type:String,
        required:true
    },
    todate:{
        type:String,
        required:true
    },
    totalamount:{
        type:String,
        required:true
    },
    totaldays:{
        type:String,
        required:true
    },
    transactionid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Booked"
    }
},{
    timestamps:true
})

const bookingmodel = mongoose.model('bookings',bookingschema);

module.exports = bookingmodel;