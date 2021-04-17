const moongose = require('mongoose')

const KondisiUserSchema = new moongose.Schema({
    bobot : {
        type : Number,
        required : true
    },
    namakondisi : {
        type : String,
        require : true
    }
},{timestamps : true})

module.exports = moongose.model('KondisiUser', KondisiUserSchema)