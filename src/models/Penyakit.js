const mongoose = require('mongoose')

const PenyakitSchema = new mongoose.Schema({
    namapenyakit : {
        type : String,
        required : true
    },
    deskripsi : {
        type : String,
        required : true
    },
    saran : {
        type : String,
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model('Penyakit', PenyakitSchema)