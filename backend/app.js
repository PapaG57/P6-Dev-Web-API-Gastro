//importation des paquets
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose
  .connect(
    'mongodb+srv://Papa_G:gf7rHACoeo3IpvEB@cluster0.pdemg.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//déclaration des variables
const app = express();

//pour les problèmes de CORS Cross-Origin Request Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//transformer le body en json objet javascript utilisable
app.use(bodyParser.json());

//les sauces
app.use('/api/sauces', saucesRoutes);

//l'authentification
app.use('/api/auth', userRoutes);

//pour l'accés aux images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Exporter la constante app (application express)
module.exports = app;
