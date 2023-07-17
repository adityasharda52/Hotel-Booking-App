const express = require('express');
const router = express.Router();
const user  = require('../models/user');


router.post('/register',async(req,res)=>{
    const newUser = new user(req.body);
    try {
      const result = await newUser.save();
      res.send("User register sucessfully");
    } catch (error) {
        return res.status(400).json({message:"Some error occured while regestring a new user"});
    }
})

router.post('/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try {
        const findUser = await user.findOne({email:email,password:password});
        if(findUser){
            const temp = {
                name: findUser.name,
                email:findUser.email,
                _id : findUser._id,
                isAdmin:findUser.isAdmin
            }
            res.send(temp);
        }else{
            return res.status(400).json({message:"Login Failed"})
        }
    } catch (error) {
        return res.status(400).json({error});
    }
});


module.exports = router;
