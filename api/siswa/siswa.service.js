const db = require('../../config/connection');
module.exports={
    serviceAddSiswa:(data,callBack)=>{
        db.query(`insert into siswa set ?`,
        [data],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetSiswa:(callBack)=>{
        db.query(`select * from siswa`,
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetSiswaById:(id_nisn,callBack)=>{
        db.query(`select * from siswa where nisn = ?`,
        [id_nisn],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceUpdateSiswa:(data,callBack)=>{
        db.query(`select * from siswa where nisn = ?`,
        [data.id_nisn],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else if(result[0]==undefined){
                return callBack(null)
            }else{
                delete data.id_nisn
                db.query(
                    `update siswa set ? where nisn =? `
                    ,[
                        data,
                        result[0].nisn
                    ]);
                    return callBack(null,result)
            }
        })
    },
    serviceDeleteSiswa:(id_nisn,callBack)=>{
        db.query(
            `select nisn from siswa where nisn=?`
        ,[id_nisn],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else if(results[0]==undefined){
                return callBack(null)
            }else{
                db.query(
                    `delete from siswa where nisn=?`,
                    [results[0].nisn]);
                return callBack(null,results)
            }
        })
    },
    serviceGetSiswaByUsername:(username,callBack)=>{ 
        db.query(
            `select * from siswa where username=? `,
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