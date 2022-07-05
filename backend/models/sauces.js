const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true }, //fabricant de la sauce
  description: { type: String, required: true },
  mainPepper: { type: String, required: true }, // poivre principale
  imageUrl: { type: String, required: true },
  heat: { type: Number, default: 0 }, //nombre 1 à 10 décrivant la sauce
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Sauce', sauceSchema);
