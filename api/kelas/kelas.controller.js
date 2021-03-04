const {
    serviceAddKelas,
    serviceGetKelas,
    serviceGetKelasById,
    serviceUpdateKelas,
    serviceDeleteKelas,
} = require('./kelas.service');

module.exports = {
    controllerAddKelas:(req,res)=>{
        const body = req.body;
        var data_kelas = {
            nama_kelas : body.nama_kelas,
            kompetensi_keahlian : body.kompetensi_keahlian
        }
        serviceAddKelas(data_kelas,(err,results)=>{
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
                    data_kelas
                })
            }
        })
    },
    controllerGetKelas:(req,res)=>{
        serviceGetKelas((err,results)=>{
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
    controllerGetKelasById:(req,res)=>{
        const id_kelas = req.params.id_kelas
        serviceGetKelasById(id_kelas,(err,results)=>{
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
    controllerUpdateKelas:(req,res)=>{
        const data_kelas = {
            id_kelas : req.params.id_kelas,
            nama_kelas : req.body.nama_kelas,
            kompetensi_keahlian : req.body.kompetensi_keahlian
        } 
        serviceUpdateKelas(data_kelas,(err,results)=>{
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
    controllerDeleteKelas:(req,res)=>{
        const id_kelas = req.params.id_kelas
        serviceDeleteKelas(id_kelas,(err,results)=>{
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
    }
}