const { number } = require('@hapi/joi')
const moongose = require('mongoose')

const BasisPengetahuanSceheme = new moongose.Schema({
    penyakitId : {
        type : moongose.Schema.Types.ObjectId,
        ref : "Penyakit",
    },
    daftar_gejala : [{
        gejalaId :  {
            type : moongose.Schema.Types.ObjectId,
            ref : "Gejala",
        },
        mb : {
            type : Number,
            required : true
        },
        md : {
            type : Number,
            required : true
        },
        cfpakar : {
            type : Number,
            required : true
        }
    }]
},{timestamps : true})

module.exports = moongose.model('BasisPengetahuan', BasisPengetahuanSceheme)