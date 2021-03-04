const db = require('../../config/connection');
module.exports={
    serviceAddTransaksiSiswa:(data,callBack)=>{
        db.query(`insert into pembayaran set ?`,
        [data],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceAddConfirmPetugas:(data,callBack)=>{
        db.query(`SELECT *
        FROM pembayaran
        INNER JOIN spp
        ON pembayaran.id_spp = spp.id_spp
        where id_pembayaran = ?`,
        [data],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{

                db.query(`update pembayaran set status=? where id_pembayaran = ?`,
                [
                    1,data
                ]);
                const hasil = result[0].nominal - result[0].jumlah_bayar
                db.query(`update spp set nominal=? where id_spp = ?`,
                [
                    hasil,
                    result[0].id_spp
                ])
                return callBack(null,result);
            }
        })
    },
    serviceGetTransaksi:(callBack)=>{
        db.query(`select * from pembayaran`,
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceGetTransaksiById:(id_pembayaran,callBack)=>{
        db.query(`select * from pembayaran where id_pembayaran = ?`,
        [id_pembayaran],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else{
                return callBack(null,result);
            }
        })
    },
    serviceUpdateTransaksi:(data,callBack)=>{
        db.query(`select * from transaksi where id_pembayaran = ?`,
        [data.id_pembayaran],
        (error,result)=>{
            if(error){
                return callBack(error);
            }else if(result[0]==undefined){
                return callBack(null)
            }else{
                delete data.id_pembayaran
                db.query(
                    `update pembayaran set ? where id_pembayaran =? `
                    ,[
                        data,
                        result[0].id_pembayaran
                    ]);
                    return callBack(null,result)
            }
        })
    },
    serviceDeleteTransaksi:(id_pembayaran,callBack)=>{
        db.query(
            `select id_pembayaran from pembayaran where id_pembayaran=?`
        ,[id_pembayaran],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else if(results[0]==undefined){
                return callBack(null)
            }else{
                db.query(
                    `delete from pembayaran where id_pembayaran=?`,
                    [results[0].id_pembayaran]);
                return callBack(null,results)
            }
        })
    }
}