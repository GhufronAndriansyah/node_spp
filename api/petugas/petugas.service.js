const db = require('../../config/connection');
module.exports={
    serviceAddPetugas:(data,callBack)=>{
        db.query(`insert into petugas set ?`,
        [data],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetPetugas:(callBack)=>{
        db.query(`select * from petugas`,
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetPetugasById:(id_petugas,callBack)=>{
        db.query(`select * from petugas where id_petugas = ?`,
        [id_petugas],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceUpdatePetugas:(data,callBack)=>{
        db.query(`select * from petugas where id_petugas = ?`,
        [data.id_petugas],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                db.query(
                    `update petugas set ? where id_petugas =? `
                    ,[
                        data,
                        data.id_petugas
                    ]);
                    return callBack(null,result)
            }
        })
    },
    serviceDeletePetugas:(id_petugas,callBack)=>{
        db.query(
            `select id_petugas from petugas where id_petugas=?`
        ,[id_petugas],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else{
                db.query(
                    `delete from petugas where id_petugas=?`,
                    [id_petugas]);
                return callBack(null,results)
            }
        })
    },
    serviceGetPetugasByUsername:(username,callBack)=>{ 
        db.query(
            `select * from petugas where username=? `,
            [username],(err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results[0])
                }
            }
        )
    }
}