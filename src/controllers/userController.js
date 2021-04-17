// import the package
const express = require('express');
const User = require('../models/User');

//validation
const {userValidation, loginValidation} = require('../routes/validation');


// GET ALL user
const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

// GET USER BY NAME
const getUserByName = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId)
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({
            message : error
        })
    }
}

// ADD USER
const addUser = async (req, res) => {
    //validate
    const {error} = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try{
        //if email exist
        const emailExist = await User.findOne({email : req.body.email})
        if(emailExist) return res.status(400).send("Email is already exsist")

        //if success
        //hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPass = await bcrypt.hash(req.body.password,salt)
        const user = new User({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            fullname : req.body.fullname,
            gender : req.body.gender,
            umur : req.body.umur,
            phone_number : req.body.phone_number,
            address : req.body.address,
            status : req.body.status
        })
        //save to DB
        const saveUser = await user.save();
        res.status(200).json(saveUser)
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}
//delete user
const deleteUser = async (req, res) => {
    try{
        const deleteUser = await User.remove({
            _id : req.params.userId
        })
        res.status(200).json(`deleted sucess id ${req.params.userId}`)
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}
// update user
const updateUser = async (req, res) => {
    try{
        const updateUser = await User.updateOne({
            _id : req.params.userId
        },
        {
            $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                fullname : req.body.fullname,
                gender : req.body.gender,
                umur : req.body.umur,
                phone_number : req.body.phone_number,
                address : req.body.address,
                status : req.body.status
            }
        }
    );
    res.status(200).json(`Update sucess id ${req.params.userId}`)
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//LOGIN user
const loginUser = async (req, res) => {
    //form validation
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
try{
    //check username exist
    const user = await User.findOne({username:req.body.username})
    if(!user) return res.status(400).send("username is not exists!")

    //check pass = username
    const EncodedPass = await bcrypt.compare(req.body.password,user.password)
    if(!EncodedPass) return res.status(400).send("Password is invalid")

}catch(err){
    res.status(400).json({ message : err})
}
}

module.exports = {
    getUser : getUser,
    getUserByName : getUserByName,
    addUser : addUser,
    deleteUser : deleteUser,
    updateUser : updateUser,
    loginUser : loginUser
};