const db = require('../../config/connection');
module.exports={
    serviceAddSpp:(data,callBack)=>{
        db.query(`insert into spp set ?`,
        [data],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetSpp:(callBack)=>{
        db.query(`select * from spp`,
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetSppById:(id_spp,callBack)=>{
        db.query(`select tahun,nominal from spp where id_spp = ?`,
        [id_spp],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceUpdateSpp:(data,callBack)=>{
        db.query(`select * from spp where id_spp = ?`,
        [data.id_spp],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                db.query(
                    `update spp set ? where id_spp =? `
                    ,[
                        data,
                        data.id_spp
                    ]);
                    return callBack(null,result)
            }
        })
    },
    serviceDeleteSpp:(id_spp,callBack)=>{
        db.query(
            `select id_spp from spp where id_spp=?`
        ,[id_spp],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else{
                db.query(
                    `delete from spp where id_spp=?`,
                    [id_spp]);
                return callBack(null,results)
            }
        }
    )},
}