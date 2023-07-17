const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');

router.post('/bookroom', async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;
    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            totalamount,
            totaldays,
            transactionid: "1234"
        })

        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({ _id: room._id });

        roomtemp.currentbooking.push({ bookingid: booking._id,
             fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
             todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
             userid: userid,
             status: booking.status 
            });
        await roomtemp.save();
        res.send("Room booked successfully");
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "I occured again" });
    }

})

module.exports = router;