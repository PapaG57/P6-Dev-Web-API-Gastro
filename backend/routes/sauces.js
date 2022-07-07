//importation
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');
const likeControllers = require('../controllers/like');

//Route POST pour créer une sauce
router.post('/', auth, multer, saucesCtrl.createSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauces);
router.post('/:id/like', auth, likeControllers.likeSauce);

//exportation
module.exports = router;
