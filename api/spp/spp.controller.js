const {
    serviceAddSpp,
    serviceGetSpp,
    serviceGetSppById,
    serviceUpdateSpp,
    serviceDeleteSpp,
} = require('./spp.service');
module.exports = {
    controllerAddSpp:(req,res)=>{
        const body = req.body;
        var data_spp = {
            tahun : body.tahun,
            nominal : body.nominal
        }
        serviceAddSpp(data_spp,(err,results)=>{
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
    controllerGetSpp:(req,res)=>{
        serviceGetSpp((err,results)=>{
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
    controllerGetSppById:(req,res)=>{
        const id_spp = req.params.id_spp
        serviceGetSppById(id_spp,(err,results)=>{
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
    controllerUpdateSpp:(req,res)=>{
        const data_spp = {
            id_spp : req.params.id_spp,
            tahun : req.body.tahun,
            nominal : req.body.nominal
        } 
        serviceUpdateSpp(data_spp,(err,results)=>{
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
    controllerDeleteSpp:(req,res)=>{
        const id_spp = req.params.id_spp
        serviceDeleteSpp(id_spp,(err,results)=>{
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