const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = mongoose.model('User');

const Router = express.Router();

Router.post('/signup', async (req, res) =>{

    const {email, password} = req.body;

    console.log(email + password);

    try {
        const user = new User({email, password});
        await user.save();


        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        res.send({token});
    }catch (e) {
        res.status(422).send(e.message);
    }
});


Router.post('/signin', async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password)
    {
        res.status(422).send({error: "you must provide password and email"})
    }

    const user = await User.findOne({email});
    if (!user)
    {
        res.status(404).send({error: "sorry this kind of email dosnt exsists"});
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        res.send(token);
    }catch (e) {
        console.log(e);
        res.status(422).send({error: "Invalid Password"})
    }
});


module.exports = Router;
