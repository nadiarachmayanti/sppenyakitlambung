// validation : utk memvalidasi data ke server dbs
const { date } = require('@hapi/joi');
const Joi = require('@hapi/joi');
const { join } = require('path');
// const { schema } = require('../models/DaftarPertanyaan');

//user validation
const userValidation = (user) => {
    const schema = Joi.object(
        {
            fullname : Joi.string()
            .required(),
            email : Joi.string()
            .min(6)
            .required()
            .email(),
            username : Joi.string()
            .required(),
            password : Joi.string()
            .required(),
            gender : Joi.string()
            .required(),
            umur : Joi.number()
            .required(),
            phone_number : Joi.string()
            .min(11)
            .required(),
            address : Joi.string()
            .required(),
            status : Joi.string()
            .required()

        }
    );
    return schema.validate(user);
};

const loginValidation = (data) => {
    const Schema = Joi.object(
        {
            username : Joi.string()
            .required(),
            password : Joi.string()
            .min(6)
            .required()
        }
    );

    return Schema.validate(data);
}

const basispengetahuanValidation = (data) => {
    const schema = Joi.object(
        {
            penyakitId : Joi.required(),
            daftar_gejala : Joi.required(),
        }
    );
    return schema.validate(data)
}

const daftarpertanyaanValidation = (data) => {
    const schema = Joi.object({
        pertanyaan : Joi.string()
        .required(),
        gejalaId : Joi.required()
    });
    return schema.validate(data);
};

const gejalaValidation = (data) => {
    const schema = Joi.object(
        {
            namagejala : Joi.string()
            .required()
        }
    );
    return schema.validate(data);
};

const konsultasiValidation = (data) => {
    const schema = Joi.object({
        userId : Joi.required(),
        temp_cfuser : Joi
        .array()
        .required()
    });
    return schema.validate(data)
}

const penyakitValidation = (data) => {
    const schema = Joi.object({
        namapenyakit : Joi.string()
        .required(),
        deskripsi : Joi.string()
        .required(),
        saran : Joi.string()
        .required()
    });
    return schema.validate(data)
}

const kondisiuserValidation = (data) => {
    const schema = Joi.object({
        bobot : Joi.number()
        .required(),
        namakondisi : Joi.string()
        .required()
    });
    return schema.validate(data)
}

const historykonsultasiValidation = (data) => {
    const schema = Joi.object({
        penyakitId : Joi.required(),
        hasilnilai : Joi.number()
        .required(),
        konsultasiId : Joi.required()
    });

    return schema.validate(data)
};

//export one by one function use this pattern
module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
module.exports.basispengetahuanValidation = basispengetahuanValidation;
module.exports.daftarpertanyaanValidation = daftarpertanyaanValidation;
module.exports.gejalaValidation = gejalaValidation;
module.exports.konsultasiValidation = konsultasiValidation;
module.exports.penyakitValidation = penyakitValidation;
module.exports.kondisiuserValidation = kondisiuserValidation;
module.exports.historykonsultasiValidation = historykonsultasiValidation;