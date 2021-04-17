// import the package
//const { date } = require('@hapi/joi');

const express = require('express');
const moongose = require('mongoose')
const Konsultasi = require('../models/Konsultasi');
const User = require('../models/User');
const DaftarPertanyaan = require('../models/DaftarPertanyaan');
const Penyakit = require('../models/Penyakit');


const {konsultasiValidation} = require('../routes/validation');

//get all konsultasi
const getKonsultasi = async (req, res) => {
    try{
        const konsultasi = await Konsultasi.find();
        res.status(200).json(konsultasi)
    }catch(err){
        res.status(400).json({
            message : err
        })
    }

}

//get konsultasi by id
const getKonsultasiById = async (req, res) => {
    try{
        const data = await Konsultasi.findOne({_id : req.params.konsulId});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

//add konsultasi
const addKonsultasi = async (req, res) => {
    console.log(req.body);
    

    const konsultasi = new Konsultasi({
        userId : req.body.userId,
        temp_cfuser : req.body.temp_cfuser
    })

    const {error} = konsultasiValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const saveData = await konsultasi.save();
        res.status(200).send({message : `Successfully add ${saveData.id}`})
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

//delete
const deleteKonsultasi = async (req, res) => {

    try{
        const deleteData = await Konsultasi.remove({
            _id : req.params.konsulId
        })
        if(deleteData.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"})
        }else{
            res.status(200).send({message : `Success deleted Id ${req.params.konsulId}`})
        }
    }catch(err){
        res.status(400).json({
            message : err
        })
    }

}

//update konsultasi
const updateKonsultasi = async (req, res) => {

    console.log(req.body);
    try{
        const {error} = konsultasiValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const updateKonsultasi = await Konsultasi.updateOne({
            _id : req.params.konsulId
        },
        {
            $set : {
                userId : req.body.userId,
                temp_cfuser : req.body.temp_cfuser,
            }
        });

        res.status(200).json({message : `Successfully Update ${req.params.konsulId}`})
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

module.exports = {
    getKonsultasi : getKonsultasi,
    getKonsultasiById : getKonsultasiById,
    addKonsultasi : addKonsultasi,
    deleteKonsultasi : deleteKonsultasi,
    updateKonsultasi : updateKonsultasi
};