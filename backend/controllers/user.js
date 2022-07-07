//importations
const bcrypt = require('bcrypt'); //hash du mot de passe
const jwt = require('jsonwebtoken'); //token d'authentification
const User = require('../models/user'); //modèle de la base de donnée
const cryptojs = require('crypto-js'); //chiffrement de l'email

//importation pour utilisation des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

// enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  //chiffrer l'email dans la base de donnée
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`)
    .toString();

  //hashage du password
  bcrypt
    .hash(req.body.password, 10) //nombre de fois que sera exécuté l'algorithme de hashage
    .then((hash) => {
      //ce qui va être enregistré dans mongoDB
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      //enregistrer dans la base de donnée
      user
        .save()
        .then(() =>
          res.status(201).json({ message: 'Utilisateur créé et enregistré !' })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//controler de la validité de l'utilisateur
exports.login = (req, res, next) => {
  //rechercher du mail de l'utilisateur chiffré dans la base de donnée
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      /* si l'utilisateur existe on utilise la méthode 'compare()' de bcrypt pour comparer le mot de passe envoyé
      par l'utilisateur avec le hash et le mail de l'utilisateur qui sont enregistrés dans la base de donnée */
      bcrypt
        .compare(req.body.password, user.password) //fonction asynchrone retourne une promise
        .then((valid) => {
          if (!valid) {
            //reçoit un booleean true ou false
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${process.env.JWT_DECODEDTOKEN}`,
              /* clé de chiffrement du token */ {
                expiresIn: '24h', //temps de validité du token
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
