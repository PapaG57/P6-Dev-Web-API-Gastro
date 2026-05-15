  1 // multer pour gérer les uploads des images
    2 // middleware pour enregistrer les images qui arrivent du frontend
    3 const multer = require('multer');
    4 const path = require('path'); // AJOUTÉ : pour gérer les chemins de fichiers
    5
    6 // dictionnaire extension fichier image
    7 const MIME_TYPES = {
    8   'image/jpg': 'jpg',
    9   'image/jpeg': 'jpg',
   10   'image/png': 'png',
   11   'image/gif': 'gif',
   12   'image/Webp': 'Webp',
   13 };
   14
   15 // objet de configuration pour multer
   16 const storage = multer.diskStorage({
   17   destination: (req, file, callback) => {
   18     // MODIFIÉ : pointe vers le dossier images à l'intérieur du dossier backend
   19     callback(null, path.join(__dirname, '..', 'images'));
   20   },
   21   filename: (req, file, callback) => {
   22     // élimine les espaces pour les remplacer par underscore
   23     const name = file.originalname.split(' ').join('_'); 
   24     const extension = MIME_TYPES[file.mimetype];
   25     // création d'un nom de fichier unique pour éviter les erreurs
   26     callback(null, name + Date.now() + '.' + extension); 
   27   },
   28 });
   29
   30 module.exports = multer({ storage }).single('image');
