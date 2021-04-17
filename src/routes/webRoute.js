//file ini berfungsi untuk mendeklarasikan route //

import express from "express"
import basispengetahuanConstroller from "../controllers/basispengetahuanConstroller";
import daftarpertanyaanController from "../controllers/daftarpertanyaanController";
import gejalaController from "../controllers/gejalaController";
import konsultasiController from "../controllers/konsultasiController";
import penyakitController from "../controllers/penyakitController";
import kondisiuserController from "../controllers/kondisiuserController";
import historykonsultasiController from "../controllers/historykonsultasiController";

let router = express.Router();

//panggil controller
import pertihunganController from "../controllers/perhitunganController"
import userController from "../controllers/userController"

const initWebRoutes = (app) => {
    
    //users
    app.post("/api/users",userController.addUser )
    app.get("/api/users", userController.getUser)
    app.get("/api/users/:userId", userController.getUserByName)
    app.patch("/api/users/:userId", userController.updateUser)
    app.delete("/api/users/:userId", userController.deleteUser)

    //basis pengetahuan
    app.get("/api/basispengetahuan",basispengetahuanConstroller.getBasisPengetahuan)
    app.get("/api/basispengetahuan/:pengetahuanId",basispengetahuanConstroller.getBasispengetahuanById)
    app.post("/api/basispengetahuan",basispengetahuanConstroller.addBasispengetahuan)
    app.delete("/api/basispengetahuan/:pengetahuanId",basispengetahuanConstroller.deleteBasispengetahuan)
    app.patch("/api/basispengetahuan/:pengetahuanId", basispengetahuanConstroller.updateBasispengetahuan)

    //penyakit
    app.get("/api/penyakit",penyakitController.getPenyakit)
    app.get("/api/penyakit/:penyakitId",penyakitController.getPenyakitById)
    app.post("/api/penyakit",penyakitController.addPenyakit)
    app.delete("/api/penyakit/:penyakitId", penyakitController.deletePenyakit)
    app.patch("/api/penyakit/:penyakitId", penyakitController.updatePenyakit)

    //gejala
    app.get("/api/gejala",gejalaController.getGejala)
    app.get("/api/gejala/:gejalaId",gejalaController.getGejalaById)
    app.post("/api/gejala",gejalaController.addGejala)
    app.delete("/api/gejala/:gejalaId", gejalaController.deleteGejala)
    app.patch("/api/gejala/:gejalaId", gejalaController.updateGejala)

    //daftar pertanyaan
    app.get("/api/daftarpertanyaan",daftarpertanyaanController.getDaftarpertanyaan)
    app.get("/api/daftarpertanyaan/:daftarId",daftarpertanyaanController.getDaftarpertanyaanById)
    app.post("/api/daftarpertanyaan",daftarpertanyaanController.addDaftarpertanyaan)
    app.delete("/api/daftarpertanyaan/:daftarId", daftarpertanyaanController.deleteDaftarpertanyaan)
    app.patch("/api/daftarpertanyaan/:daftarId", daftarpertanyaanController.updateDaftarpertanyaan)

    //kondisi user
    app.get("/api/kondisiuser", kondisiuserController.getKondisiUser)
    app.get("/api/kondisiuser/:kondisiId",kondisiuserController.getKondisiUserById)
    app.post("/api/kondisiuser",kondisiuserController.addKondisiUser)
    app.delete("/api/kondisiuser/:kondisiId", kondisiuserController.deleteKondisiUser)
    app.patch("/api/kondisiuser/:kondisiId", kondisiuserController.updateKondisiUser)

    //konsultasi
    app.get("/api/konsultasi", konsultasiController.getKonsultasi)
    app.get("/api/konsultasi/:konsulId",konsultasiController.getKonsultasiById)
    app.post("/api/konsultasi",konsultasiController.addKonsultasi)
    app.delete("/api/konsultasi/:konsulId", konsultasiController.deleteKonsultasi)
    app.patch("/api/konsultasi/:konsulId", konsultasiController.updateKonsultasi)

    //history konsultasi
    app.get("/api/historykonsultasi", historykonsultasiController.getHistoryKonsultasi)
    app.get("/api/historykonsultasi/:historyId",historykonsultasiController.getHistoryKonsultasiById)
    app.post("/api/historykonsultasi",historykonsultasiController.addHistoryKonsultasi)
    app.delete("/api/historykonsultasi/:historyId", historykonsultasiController.deleteHistoryKonsultasi)
    app.patch("/api/historykonsultasi/:historyId", historykonsultasiController.updateHistoryKonsultasi)

    //perhitungan
    app.get("/api/testperhitungan/:konsulId", pertihunganController.hitungCF)

    
    return app.use("/",router);
}

module.exports = initWebRoutes;
