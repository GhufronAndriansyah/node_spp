const {
    controllerAddTransaksiSiswa,
    controllerAddConfirmPetugas,
    controllerGetTransaksi,
    controllerGetTransaksiById,
    controllerUpdateTransaksi,
    controllerDeleteTransaksi
} = require('./transaksi.controller')
const router = require('express').Router();
router.post('/', controllerAddTransaksiSiswa);
router.post('/confirm/:id_transaksi', controllerAddConfirmPetugas);
router.get('/', controllerGetTransaksi);
router.get('/:id_transaksi', controllerGetTransaksiById);
router.patch('/:id_transaksi', controllerUpdateTransaksi);
router.delete('/:id_transaksi', controllerDeleteTransaksi)

module.exports = router;