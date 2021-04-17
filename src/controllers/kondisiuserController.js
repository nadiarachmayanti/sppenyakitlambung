// import the package
const express = require('express');
const KondisiUser = require('../models/KondisiUser');
const { kondisiuserValidation } = require('../routes/validation');

// get all penyakit
const getKondisiUser = async (req, res) => {
    try{
        const data = await KondisiUser.find();
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err);
    }
}

//get penyakit by id
const getKondisiUserById = async (req, res) => {
    try{
        const data = await Penyakit.findOne({_id : req.params.kondisiId});
        res.status(200).send(data);
    }catch(err){
        res.status(400).send(err)
    }
}

//add intent
const addKondisiUser = async (req, res) => {
    console.log(req.body);

    const kondisiuser = new KondisiUser({
        bobot : req.body.bobot,
        namakondisi : req.body.namakondisi
    })

    const {error} = kondisiuserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const saveData = await kondisiuser.save();
        res.status(200).send({message : `Successfully add ${saveData.id}`})
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

//delete
const deleteKondisiUser = async (req, res) => {

    try{
        const deleteData = await KondisiUser.remove({
            _id : req.params.penyakitId
        })
        if(deleteData.deleteCount == 0){
            res.status(200).send({message : "No data is deleted!"})
        }else{
            res.status(200).send({message : `Success deleted Id ${req.params.kondisiId}`})
        }
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

//update 
const updateKondisiUser = async (req, res) => {

    console.log(req.body);
    try{
        const{error} = kondisiValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const updateKondisiUser = await KondisiUser.updateOne({
            _id : req.params.kondisiId
        },
        {
            $set : {
                bobot : req.body.bobot,
                namakondisi : req.body.namakondisi
            }
        });

    res.status(200).json({message : `Successfully Update ${req.params.kondisiId}`}) 
    }catch(err){
        res.status(400).json({
            message : err
        })
    }
}

module.exports = {
    getKondisiUser : getKondisiUser,
    getKondisiUserById: getKondisiUserById,
    addKondisiUser : addKondisiUser,
    deleteKondisiUser : deleteKondisiUser,
    updateKondisiUser : updateKondisiUser
};