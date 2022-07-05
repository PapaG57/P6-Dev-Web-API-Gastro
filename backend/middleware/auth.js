const jwt = require('jsonwebtoken');

//importation pour utilisation des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

module.exports = (req, res, next) => {
  try {
    //récupération du token dans le headers Authorization: Bearer token
    const token = req.headers.authorization.split(' ')[1]; //on récupére le 2eme élement du tableau qui est le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_DECODEDTOKEN}`);

    //récupérer le userId qu'il y a à l'intérieur
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next(); //passe la requête au middleware suivant
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non autorisée' });
  }
};
