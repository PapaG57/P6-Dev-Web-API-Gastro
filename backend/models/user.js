const mongoose = require('mongoose');

//contrôle et vérifie le mail dans la base de donnée afin d'éviter les doublons
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
console.log(email, password);

//shéma pour n'enregistrer q'une adresse mail unique dans la base de donnée
userSchema.plugin(uniqueValidator); // on applique la méthode plugin pour controler le mail

module.exports = mongoose.model('User', userSchema);
