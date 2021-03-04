const {
    serviceAddPetugas,
    serviceGetPetugas,
    serviceGetPetugasById,
    serviceUpdatePetugas,
    serviceDeletePetugas,
    serviceGetPetugasByUsername
} = require('./petugas.service');

const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken')

module.exports = {
    controllerAddPetugas:(req,res)=>{
        const body = req.body;
        body.password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(10));
        var data_petugas = {
            username : body.username,
            password : body.password,
            nama_petugas: body.nama_petugas,
            level : body.level
        }
        serviceAddPetugas(data_petugas,(err,results)=>{
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
                    data_petugas
                })
            }
        })
    },
    controllerGetPetugas:(req,res)=>{
        serviceGetPetugas((err,results)=>{
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
    controllerGetPetugasById:(req,res)=>{
        const id_petugas = req.params.id_petugas
        serviceGetPetugasById(id_petugas,(err,results)=>{
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
    controllerUpdatePetugas:(req,res)=>{
        const body = req.body
        const data_petugas = {
            id_petugas : req.params.id_petugas,
            username : body.username,
            password : body.password,
            nama_petugas: body.nama_petugas,
            level : body.level
        } 
        serviceUpdatePetugas(data_petugas,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results[0] !== undefined){
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
    controllerDeletePetugas:(req,res)=>{
        const id_petugas = req.params.id_petugas
        serviceDeletePetugas(id_petugas,(err,results)=>{
            if(err){
                console.log(err);
            }else if(results[0] !== undefined){
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
    controllerLoginPetugas:(req,res)=>{
        const body = req.body;
        serviceGetPetugasByUsername(body.username,(err,results)=>{
            if(err){
                console.log(err)
            }if(!results){
                return res.json({
                    success:0,
                    message:"Invalid username or password"
                })
            }

            const result = bcrypt.compare(body.password,results.password)
            console.log(result);
            if(result){
                results.password = undefined
                const jsonwebtoken = sign({result:results},"secretkey",{
                    expiresIn:"1h"
                })
                return res.json({
                    success:1,
                    message:"Login succesfuly, Your Acount Already Use",
                    account: results,
                    token:jsonwebtoken
                })
            }else{
                return res.json({
                    success:0,
                    message:"Username or password invalid"
                })
            }
        })
    },
}