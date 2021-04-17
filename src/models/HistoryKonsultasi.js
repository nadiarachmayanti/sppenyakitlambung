
const moongose = require('mongoose')

const HistoryKonsultasiScheme = new moongose.Schema({
    penyakitId : [{
        type : moongose.Schema.Types.ObjectId,
        ref : "Penyakit"
    }],
    hasilnilai : {
        type : Number
    },
    konsultasiId : {
        type : moongose.Schema.Types.ObjectId,
        ref : "Konsultasi"
    }
},{timestamps : true})

module.exports = moongose.model('HistoryKonsultasi', HistoryKonsultasiScheme)