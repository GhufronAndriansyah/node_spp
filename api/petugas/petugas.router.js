const {
    controllerAddPetugas,
    controllerGetPetugas,
    controllerGetPetugasById,
    controllerUpdatePetugas,
    controllerDeletePetugas,
    controllerLoginPetugas
} = require('./petugas.controller')

const router = require('express').Router();

router.post('/', controllerAddPetugas);
router.get('/', controllerGetPetugas);
router.get('/:id_petugas', controllerGetPetugasById);
router.patch('/:id_petugas', controllerUpdatePetugas);
router.delete('/:id_petugas', controllerDeletePetugas)
router.post("/login", controllerLoginPetugas);
module.exports = router;