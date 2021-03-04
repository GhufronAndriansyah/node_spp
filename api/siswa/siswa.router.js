const {
    controllerAddSiswa,
    controllerGetSiswa,
    controllerGetSiswaById,
    controllerUpdateSiswa,
    controllerDeleteSiswa,
    controllerLoginSiswa
} = require('./siswa.controller')
const router = require('express').Router();
router.post('/', controllerAddSiswa);
router.get('/', controllerGetSiswa);
router.get('/:id_nisn', controllerGetSiswaById);
router.patch('/:id_nisn', controllerUpdateSiswa);
router.delete('/:id_nisn', controllerDeleteSiswa)
router.post("/login", controllerLoginSiswa);

module.exports = router;