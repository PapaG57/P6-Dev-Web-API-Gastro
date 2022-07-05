//importation
const Sauces = require('../models/sauces'); //modèle de la base de donnée
const fs = require('fs'); // accéde au système de fichier
const request = require('http');

//création d'une sauce
exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.thing);
  delete saucesObject._id;
  delete saucesObject._userId;
  const sauces = new Sauces({
    ...saucesObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });

  sauces
    .save()
    .then(() => {
      res.status(201).json({ message: 'Sauces enregistrées !' });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// modification une sauce sur autorisation
exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file
    ? {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete saucesObject._userId;
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        res.status(403).json({ message: 'Unauthorized request !' });
      } else {
        Sauces.updateOne(
          { _id: req.params.id },
          { ...saucesObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Sauces modifiées !' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// supprimer une sauce
exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        res.status(403).json({ message: 'Unauthorized request !' });
      } else {
        const filename = sauces.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauces.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: 'Sauces supprimées !' });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// pour obtenir une sauce en particulier avec son id
exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

//pour obtenir la liste complète avec la méthode find()
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
