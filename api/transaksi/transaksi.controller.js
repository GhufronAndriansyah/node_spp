const {
    serviceAddTransaksiSiswa,
    serviceAddConfirmPetugas,
    serviceGetTransaksi,
    serviceGetTransaksiById,
    serviceUpdateTransaksi,
    serviceDeleteTransaksi,
} = require('./transaksi.service');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken')
module.exports = {
    controllerAddTransaksiSiswa:(req,res)=>{
        const body = req.body;
        const date = new Date();
        const month = new Date().getMonth()+1;
        const year = new Date().getFullYear();
        var data_transaksi = {
            id_petugas : 0,
            nisn : body.nisn,
            tgl_bayar : date,
            bulan_dibayar: month,
            tahun_dibayar : year,
            id_spp : body.id_spp,
            jumlah_bayar: body.jumlah_bayar,
            status : 0
        }
        serviceAddTransaksiSiswa(data_transaksi,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }else{
                return res.status(200).json({
                    success:1,
                    data:results,
                })
            }
        })
    },
    controllerAddConfirmPetugas:(req,res)=>{
        const id_transaksi = req.params.id_transaksi
        serviceAddConfirmPetugas(id_transaksi,(err,results)=>{
            if(err){
                console.log(err);
            }else{
                return res.status(200).json({
                    success:1,
                    data:results
                })
            }
        })
    },
    controllerGetTransaksi:(req,res)=>{
        serviceGetTransaksi((err,results)=>{
            if(err){
                console.log(err);
            }else{
                return res.status(200).json({
                    success:1,
                    data:results
                })
            }
        })
    },
    controllerGetTransaksiById:(req,res)=>{
        const id_transaksi = req.params.id_transaksi
        serviceGetTransaksiById(id_transaksi,(err,results)=>{
            if(err){
                console.log(err);
            }else if((!(results[0]===undefined))){
                return res.status(200).json({
                    success:1,
                    data:results
                })
            }else{
                return res.json({
                    data:"Not found"
                })
            }
        })
    },
    controllerUpdateTransaksi:(req,res)=>{
        const body = req.body;
        const data_transaksi = {
            id_petugas : req.params.id_petugas,
            nisn : body.nisn,
            tgl_bayar : body.tgl_bayar,
            bulan_dibayar: body.bulan_dibayar,
            tahun_dibayar : body.tahun_dibayar,
            id_spp : body.id_spp,
            jumlah_bayar: body.jumlah_bayar
        } 
        serviceUpdateTransaksi(data_transaksi,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results !== undefined){
                return res.status(200).json({
                    success:1,
                    data:"Success"
                })
            }else{
                return res.json({
                    data:"Not Found"
                })
            }
        })
    },
    controllerDeleteTransaksi:(req,res)=>{
        const id_transaksi= req.params.id_transaksi
        serviceDeleteTransaksi(id_transaksi,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results !== undefined){
                return res.status(200).json({
                    success:1,
                    data:"Success"
                })
            }else{
                return res.json({
                    data:"Not Found"
                })
            }
        })
    },
}