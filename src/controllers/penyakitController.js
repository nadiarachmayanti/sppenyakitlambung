// import the package
const express = require('express');
const Penyakit = require('../models/Penyakit');
const { penyakitValidation } = require('../routes/validation');

// get all penyakit
const getPenyakit = async (req, res) => {
    try{
        const data = await Penyakit.find();
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

//get penyakit by id
const getPenyakitById = async (req, res) => {
    try{
        const data = await Penyakit.findOne({_id : req.params.penyakitId});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err)
    }
}

//add penyakit
const addPenyakit = async (req, res) => {
    console.log(req.body);

    const penyakit = new Penyakit({
        namapenyakit : req.body.namapenyakit,
        deskripsi : req.body.deskripsi,
        saran : req.body.saran
    })

    const {error} = penyakitValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const saveData = await penyakit.save();
        res.status(200).send({message : `Successfully add ${saveData._id}`})
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

//delete
const deletePenyakit = async (req, res) => {

    try{
        const deleteData = await Penyakit.remove({
            _id : req.params.penyakitId
        })
        if(deleteData.deleteCount == 0){
            res.status(200).send({message : "No data is deleted!"})
        }else{
            res.status(200).send({message : `Success deleted Id ${req.params.penyakitId}`})
        }
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//update 
const updatePenyakit = async (req, res) => {

    console.log(req.body);
    try{
        const{error} = penyakitValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const updatePenyakit = await Penyakit.updateOne({
            _id : req.params.penyakitId
        },
        {
            $set : {
                namapenyakit : req.body.namapenyakit,
                deskripsi : req.body.deskripsi,
                saran : req.body.saran
            }
        });

    res.status(200).json({message : `Successfully Update ${req.params.penyakitId}`}) 
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

module.exports = {
    getPenyakit : getPenyakit,
    getPenyakitById : getPenyakitById,
    addPenyakit : addPenyakit,
    deletePenyakit : deletePenyakit,
    updatePenyakit : updatePenyakit
};