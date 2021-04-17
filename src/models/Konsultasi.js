//rule perhitungan, rule cfuser

//const { number } = require('@hapi/joi');
const moongose = require('mongoose')

const konsultasiScheme = new moongose.Schema({
    userId : {
        type : moongose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    temp_cfuser : {
        type : [{
            pertanyaanId : {
                type : moongose.Schema.Types.ObjectId,
                ref : "DaftarPertanyaan"
            },
            kondisiuserId : {
                type : moongose.Schema.Types.ObjectId,
                ref : "KondisiUser"
            }
        }]
    }
},{timestamps : true})


module.exports = moongose.model('Konsultasi', konsultasiScheme)