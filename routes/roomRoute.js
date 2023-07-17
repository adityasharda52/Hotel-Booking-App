const express = require('express');
const router = express.Router();
const room  = require('../models/room');

router.get('/getallrooms',async (req,res)=>{
    try {
        const rooms = await room.find({});
        //console.log(rooms);
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({message:"Error in getting data from room model"});
    }
});

router.post('/getroombyid',async (req,res)=>{
    const roomId = req.body.roomid;
    //console.log(roomId);
    try {
        //console.log('Searching for room with ID:', roomId);
        const foundRoom = await room.findOne({ _id: roomId });
        //console.log('Found Room:', foundRoom);
        res.send(foundRoom);
    } catch (error) {
        return res.status(400).json({message:"Error in getting data of room in database"});
    }
});

module.exports = router;