//importations
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password');

//les routes d'enregistrement et de login
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

//exportation
module.exports = router;
