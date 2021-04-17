const moongose = require('mongoose')

const GejalaSchema = new moongose.Schema({
    namagejala : {
        type : String,
        required : true
    }
},{timestamps : true})

module.exports = moongose.model('Gejala', GejalaSchema)