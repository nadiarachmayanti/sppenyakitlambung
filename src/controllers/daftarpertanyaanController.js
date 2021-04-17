//import the package
const express = require('express');
const DaftarPertanyaan = require('../models/DaftarPertanyaan');

const {daftarpertanyaanValidation} = require('../routes/validation');

//const { captureRejectionSymbol } = require('node:events');

//get all daftar pertanyaan 
const getDaftarpertanyaan = async (req, res) => {
    try{
        const data = await DaftarPertanyaan.find();
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

//get all daftar pertanyaan by id 
const getDaftarpertanyaanById = async (req, res) => {
    try{
        const data = await DaftarPertanyaan.findOne({_id : req.params.daftarId});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

//add daftar pertanyaan
const addDaftarpertanyaan = async (req, res) => {

    console.log(req.body);

    const daftarpertanyaan = new DaftarPertanyaan({
        pertanyaan : req.body.pertanyaan,
        gejalaId : req.body.gejalaId
    })

    const {error} = daftarpertanyaanValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const gejalaIdExist = await DaftarPertanyaan.findOne({gejalaId : req.body.gejalaId})
            if(gejalaIdExist) return res.status(400).send("Gejala is already exsist")

        const saveData = await daftarpertanyaan.save();
        res.status(200).send({message : `Successfully add ${saveData.id}`})
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

//delete
const deleteDaftarpertanyaan = async (req, res) => {

    try{
        const deleteData = await DaftarPertanyaan.remove({
            _id : req.params.daftarId
        })
        if(deleteData.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"})
        }else{
            res.status(200).send({message : `Success deleted Id ${req.params.daftarId}`})
        }
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//update daftar pertanyaan
const updateDaftarpertanyaan = async (req, res) => {

    try{
        const {error} = daftarpertanyaanValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const updateDaftarpertanyaan = await DaftarPertanyaan.updateOne({
            _id : req.params.daftarId
        },
        {
            $set : {
                pertanyaan : req.body.pertanyaan,
                gejalaId : req.body.gejalaId
            }
        });

        res.status(200).json({message : `Successfully update ${req.params.daftarId}`})
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

module.exports = {
    getDaftarpertanyaan : getDaftarpertanyaan,
    getDaftarpertanyaanById : getDaftarpertanyaanById,
    addDaftarpertanyaan : addDaftarpertanyaan,
    deleteDaftarpertanyaan : deleteDaftarpertanyaan,
    updateDaftarpertanyaan : updateDaftarpertanyaan
};