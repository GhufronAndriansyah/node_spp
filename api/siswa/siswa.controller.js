const {
    serviceAddSiswa,
    serviceGetSiswa,
    serviceGetSiswaById,
    serviceUpdateSiswa,
    serviceDeleteSiswa,
    serviceGetSiswaByUsername
} = require('./siswa.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const SECRET_KEY = "Siswa"
module.exports = {
    controllerAddSiswa:(req,res)=>{
        const body = req.body;
        body.password = bcrypt.hashSync(body.password,bcrypt.genSaltSync(10));
        var data_siswa = {
            nisn : body.nisn,
            nis : body.nis,
            nama : body.nama,
            id_kelas : body.id_kelas,
            alamat : body.alamat,
            no_telp : body.no_telp,
            id_spp : body.id_spp,
            username: body.username,
            password: body.password
        }
        serviceAddSiswa(data_siswa,(err,results)=>{
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
    controllerGetSiswa:(req,res)=>{
        serviceGetSiswa((err,results)=>{
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
    controllerGetSiswaById:(req,res)=>{
        const id_nisn = req.params.id_nisn
        serviceGetSiswaById(id_nisn,(err,results)=>{
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
    controllerUpdateSiswa:(req,res)=>{
        const data_siswa = {
            id_nisn : req.params.id_nisn,
            nisn : req.body.nisn,
            nis : req.body.nis,
            nama : req.body.nama,
            id_kelas : req.body.id_kelas,
            alamat : req.body.alamat,
            no_telp : req.body.no_telp,
            id_spp : req.body.id_spp
        } 
        serviceUpdateSiswa(data_siswa,(err,results)=>{
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
    controllerDeleteSiswa:(req,res)=>{
        const id_nisn= req.params.id_nisn
        serviceDeleteSiswa(id_nisn,(err,results)=>{
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
    controllerLoginSiswa:(req,res)=>{
        const body = req.body;
        serviceGetSiswaByUsername(body.username,(err,results)=>{
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
                let payload = JSON.stringify(result)
                // generate token
                let token = jwt.sign(payload, SECRET_KEY)
                res.json({
                    logged: true,
                    data: result,
                    token: token
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