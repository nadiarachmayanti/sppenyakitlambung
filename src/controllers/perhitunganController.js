// import the package
const express = require('express');
const BasisPengetahuan = require('../models/BasisPengetahuan');
const Konsultasi = require('../models/Konsultasi');
const Gejala = require('../models/Gejala');
const { perhitunganValidation } = require('../routes/validation');


// GET ALL perhitungan
const hitungCF = async (req, res) => {
    try{
        // Ambil data konsultasi untuk mengambil data bobot user
        const konsulData = await Konsultasi.findOne({_id : req.params.konsulId})
        .populate('userId')
        .populate({
            path : 'temp_cfuser.pertanyaanId',
            populate : 'gejalaId'
        })
        .populate({
            path : 'temp_cfuser',
            populate : 'kondisiuserId pertanyaanId'
        })

        // Ambil data bobot pakar di basis pengetahuan
        const basisData = await BasisPengetahuan.find()
        .populate('penyakitId')
        .populate({
            path : 'daftar_gejala',
            populate : 'gejalaId'
        });


        // bobot pilihan user
        var bobotUser = []
        for(var i in konsulData.temp_cfuser){
            bobotUser.push({gejala : konsulData.temp_cfuser[i].pertanyaanId.gejalaId , bobot : konsulData.temp_cfuser[i].kondisiuserId.bobot });
        }
        // daftar penyakit
        // gejala penyakit yang difilter berdasarkan bobot user
        var hasil_list = []
        for(var i in basisData){
            var filterBobot = filterGejalaUserByGejalaPenyakit(bobotUser,basisData[i].daftar_gejala)
            var list_cfhe = hitungCFHE(basisData[i].penyakitId,basisData[i].daftar_gejala,filterBobot);
            hasil_list.push(list_cfhe)
        }
  
        res.status(200).send({
            basisP : basisData,
            konsultasi : hasil_list
        });
    }catch(err){
        res.status(400).send(err);
    }
}

function filterGejalaUserByGejalaPenyakit(bobotUser,basisPenyakit){
        var gejalaUser = []
        bobotUser.filter(function(item) {      
         gejalaUser.push(item.gejala._id.toString())
        })

        var gejalaPenyakit = []
        basisPenyakit.filter(function (item) {
            gejalaPenyakit.push(item.gejalaId._id.toString())
        })

        gejalaUser = gejalaUser.filter(function(item) {
            return gejalaPenyakit.includes(item);
        })
        var filterBobot = []
        for(var i in bobotUser){  
            for(var j in gejalaUser){
                if(bobotUser[i].gejala._id.toString() == gejalaUser[j]){
                    filterBobot.push(bobotUser[i])
                }
            } 
        }

        return filterBobot
}

function hitungCFHE(penyakit,daftargejala,bobotuser) {
    var list_cfhe = []
    // // Check and group based cfuser and gejala
    for(var i in daftargejala){       
        var daftar_gejala = daftargejala[i]
        for(var j in bobotuser){
            if(daftar_gejala.gejalaId._id.toString() == bobotuser[j].gejala._id.toString()){
                list_cfhe.push({ gejala : daftar_gejala.gejalaId.namagejala, hasil : bobotuser[j].bobot*daftar_gejala.cfpakar})
            }
        }   
        
    }

    var combine= 0
    if(list_cfhe.length >0){
        // var next = (list_cfhe.length - 1 == i)? 0 : (parseInt(i)+1);
        combine = list_cfhe[0].hasil+list_cfhe[1].hasil*(1 - list_cfhe[0].hasil)         
    }
        // hitung combine
    if(list_cfhe.length>1){
        for(var i=2; i< list_cfhe.length;i++){
            var hasil = combine+list_cfhe[i].hasil*(1-combine);
            combine = hasil
            }
    }

    console.log(list_cfhe);
    
    return {penyakit : penyakit, hasil: combine*100 + '%'}
}


module.exports = {
    hitungCF : hitungCF
};