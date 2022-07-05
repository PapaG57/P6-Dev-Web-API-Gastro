const passwordValidator = require('password-validator');

//création du schema
let passwordSchema = new passwordValidator();

//le schéma que doit respecter le mot de passe
passwordSchema
  .is()
  .min(8) // Longueur minimale 8 caractères
  .is()
  .max(100) // Longeur Maximale 100 caractères
  .has()
  .uppercase() // Doit avoir des lettres majuscules
  .has()
  .lowercase() // Doit avoir des lettres minuscules
  .has()
  .digits(2) // oit avoir au moins 2 chiffres
  .has()
  .not()
  .spaces() // Les espaces ne sont pas autorisés
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Mettre ces valeurs sur la liste noire

//Vérification de la qualité du password par rapport au schema
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res
      .status(400)
      .json({
        error:
          "Le mot de passe n'est pas assez fort : " +
          passwordSchema.validate(req.body.password, { list: true }),
      });
  } else {
    next();
  }
};
