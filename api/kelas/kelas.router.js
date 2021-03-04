const {
    controllerAddKelas,
    controllerGetKelas,
    controllerGetKelasById,
    controllerUpdateKelas,
    controllerDeleteKelas
} = require('./kelas.controller')
const auth = require('../../auth/siswa')
const router = require('express').Router();
router.post('/', controllerAddKelas);
router.get('/', auth, controllerGetKelas);
router.get('/:id_kelas', controllerGetKelasById);
router.patch('/:id_kelas', controllerUpdateKelas);
router.delete('/:id_kelas', controllerDeleteKelas)

module.exports = router;