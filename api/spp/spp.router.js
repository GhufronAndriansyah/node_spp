const {
    controllerAddSpp,
    controllerGetSpp,
    controllerGetSppById,
    controllerUpdateSpp,
    controllerDeleteSpp
} = require('./spp.controller')
const router = require('express').Router();
router.post('/', controllerAddSpp);
router.get('/', controllerGetSpp);
router.get('/:id_spp', controllerGetSppById);
router.patch('/:id_spp', controllerUpdateSpp);
router.delete('/:id_spp', controllerDeleteSpp)

module.exports = router;