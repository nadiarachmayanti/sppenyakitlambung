//import the package
const express = require ('express');
const BasisPengetahuan = require ('../models/BasisPengetahuan');
//const { update } = require('../models/DaftarPertanyaan');

const {basispengetahuanValidation} = require('../routes/validation');
const {mongoose} = require('mongoose');

//get all basis pengetahuan
const getBasisPengetahuan = async (req, res) => {
    try{
        const data = await BasisPengetahuan.find();
        res.status(200).send(data);
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//get  basis pengetahuan by id
const getBasispengetahuanById = async (req, res) => {
    try{
        const data = await BasisPengetahuan.findOne({_id : req.params.BasisPengetahuan});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

// add intens
const addBasispengetahuan = async (req, res) => {

    console.log(req.body);

    const bp = new BasisPengetahuan({
        penyakitId : req.body.penyakitId,
        daftar_gejala : req.body.daftar_gejala
    })
    const {error} = basispengetahuanValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try {
        const saveData = await bp.save();
        res.status(200).send({message : `Successfully add ${saveData._id}`, _id : saveData._id})
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

//delete
const deleteBasispengetahuan = async (req, res) => {
    try{
        const deleteData = await BasisPengetahuan.remove({
            _id : req.params.pengetahuanId
        })
        if(deleteData.deleteCount == 0) {
            res.status(200).send({message : "No data is deleted"})
        }else{
            res.status(200).send({message : `Success deleted Id ${req.params.pengetahuanId}`})
        }
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//update basis pengetahuan
const updateBasispengetahuan = async (req, res) => {
    console.log(req.body);
    try{
        const {error} = basispengetahuanValidation(req.body);
            if (error) return res.status(400).send(error.details[0].message);
        const updateBasispengetahuan = await BasisPengetahuan.updateOne({
            _id : req.params.pengetahuanId
        },
        {
            $set : {
                penyakitId : req.body.penyakitId,
                daftar_gejala : req.body.daftar_gejala
            }
        }
        );

        res.status(200).json({message : `Successfully Update ${req.params.pengetahuanId}`})
        }catch(err){
            res.status(400).json({
                message : err
            })
        }
}

module.exports = {
    getBasisPengetahuan : getBasisPengetahuan,
    getBasispengetahuanById : getBasispengetahuanById,
    addBasispengetahuan : addBasispengetahuan,
    deleteBasispengetahuan : deleteBasispengetahuan,
    updateBasispengetahuan : updateBasispengetahuan
};