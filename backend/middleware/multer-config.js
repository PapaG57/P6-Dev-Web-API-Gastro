// multer pour gérer les uploads des images
// middleware pour enregistrer les images qui arrivent du frontend
const multer = require('multer');
const path = require('path'); // AJOUTÉ : pour gérer les chemins de fichiers

// dictionnaire extension fichier image
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/Webp': 'Webp',
};

// objet de configuration pour multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // MODIFIÉ : pointe vers le dossier images à l'intérieur du dossier backend
    callback(null, path.join(__dirname, '..', 'images'));
  },
  filename: (req, file, callback) => {
    // élimine les espaces pour les remplacer par underscore
    const name = file.originalname.split(' ').join('_'); 
    const extension = MIME_TYPES[file.mimetype];
    // création d'un nom de fichier unique pour éviter les erreurs
    callback(null, name + Date.now() + '.' + extension); 
  },
});

module.exports = multer({ storage }).single('image');
