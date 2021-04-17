//import the package
const express = require('express');
const HistoryKonsultasi = require('../models/HistoryKonsultasi');

const {historykonsultasiValidation} = require('../routes/validation');

//get all histori
const getHistoryKonsultasi = async (req, res) => {
        try{
            const data = await HistoryKonsultasi.find();
            res.status(200).send(data);
        }catch(err){
            res.status(400).send(err);
        }
    }

//get hist by id
const getHistoryKonsultasiById = async (req, res) => {
    try{
        const data = await Gejala.findOne({_id : req.params.historyId});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

//add gejala
const addHistoryKonsultasi = async (req, res) => {
    console.log(req.body);

    const historykonsultasi = new HistoryKonsultasi({
        penyakitId : req.body.penyakitId,
        hasilnilai : req.body.hasilnilai,
        konsultasiId : req.body.konsultasiId
    })

    const {error} = historykonsultasiValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const saveData = await historykonsultasi.save();
        res.status(200).send({message : `Succesfully add ${saveData.id}`})
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

// delete
const deleteHistoryKonsultasi = async (req, res) => {

    try{
        const deleteData = await HistoryKonsultasi.remove({
            _id : req.params.historyId
        })
        if(deleteData.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted!"})
        }else{
            res.status(200).send({message : `Success deleted Id ${req.params.historyId}`})
        }
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//update
const updateHistoryKonsultasi = async (req, res) => {

    console.log(req.body);
    try{
        const {error} = historykonsultasiValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const updateHistoryKonsultasi = await HistoryKonsultasi.updateOne({
            _id : req.params.historyId
        },
        {
            $set : {
                penyakitId : req.body.penyakitId,
                hasilnilai : req.body.hasilnilai,
                konsultasiId : req.body.konsultasiId
            }
        });

        res.status(200).json({message : `Successfully Update ${req.params.historyId}`})
        }catch(err){
            res.status(400).json({
                message : err
            })
        }
}

module.exports = {
    getHistoryKonsultasi : getHistoryKonsultasi,
    getHistoryKonsultasiById : getHistoryKonsultasiById,
    addHistoryKonsultasi : addHistoryKonsultasi,
    deleteHistoryKonsultasi : deleteHistoryKonsultasi,
    updateHistoryKonsultasi : updateHistoryKonsultasi
};