const moongose = require('mongoose')

const DaftarPertanyaanScheme = new moongose.Schema({
    pertanyaan : {
        type : String,
        required : true
    },
    gejalaId : {
        type : moongose.Schema.Types.ObjectId,
        ref : "Gejala"
    }
},{timestamps : true});

module.exports = moongose.model('DaftarPertanyaan', DaftarPertanyaanScheme)