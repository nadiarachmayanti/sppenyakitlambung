//import the package
const express = require('express');
const Gejala = require('../models/Gejala');

const {gejalaValidation} = require('../routes/validation');

//get all gejala
const getGejala = async (req, res) => {
        try{
            const data = await Gejala.find();
            res.status(200).send(data);
        }catch(err){
            res.status(400).send(err);
        }
    }

//get gejala by id
const getGejalaById = async (req, res) => {
    try{
        const data = await Gejala.findOne({_id : req.params.gejalaId});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

//add gejala
const addGejala = async (req, res) => {
    console.log(req.body);

    const gejala = new Gejala({
        namagejala : req.body.namagejala
    })

    const {error} = gejalaValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const saveData = await gejala.save();
        res.status(200).send({message : `Succesfully add ${saveData._id}`, _id : saveData._id})
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

// delete
const deleteGejala = async (req, res) => {

    try{
        const deleteData = await Gejala.remove({
            _id : req.params.gejalaId
        })
        if(deleteData.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"})
        }else{
            res.status(200).send({message : `Success deleted Id ${req.params.gejalaId}`})
        }
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//update
const updateGejala = async (req, res) => {

    console.log(req.body);
    try{
        const {error} = gejalaValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const updateGejala = await Gejala.updateOne({
            _id : req.params.gejalaId
        },
        {
            $set : {
                namagejala : req.body.namagejala
            }
        });

        res.status(200).json({message : `Successfully Update ${req.params.gejalaId}`})
        }catch(err){
            res.status(400).json({
                message : err
            })
        }
}

module.exports = {
    getGejala : getGejala,
    getGejalaById : getGejalaById,
    addGejala : addGejala,
    deleteGejala : deleteGejala,
    updateGejala : updateGejala
};