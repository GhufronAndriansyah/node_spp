const db = require('../../config/connection');
module.exports={
    serviceAddKelas:(data,callBack)=>{
        db.query(`insert into kelas set ?`,
        [data],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetKelas:(callBack)=>{
        db.query(`select * from kelas`,
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetKelasById:(id_kelas,callBack)=>{
        db.query(`select nama_kelas,kompetensi_keahlian from kelas where id_kelas = ?`,
        [id_kelas],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceUpdateKelas:(data,callBack)=>{
        db.query(`select * from kelas where id_kelas = ?`,
        [data.id_kelas],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                db.query(
                    `update kelas set ? where id_kelas =? `
                    ,[
                        data,
                        data.id_kelas
                    ]);
                    return callBack(null,result)
            }
        })
    },
    serviceDeleteKelas:(id_kelas,callBack)=>{
        db.query(
            `select id_kelas from kelas where id_kelas=?`
        ,[id_kelas],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else{
                db.query(
                    `delete from kelas where id_kelas=?`,
                    [id_kelas]);
                return callBack(null,results)
            }
        }
    )},
}