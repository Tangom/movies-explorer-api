const mongoose = require('mongoose');
const validator = require('validator');

const moviesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },

  director: {
    type: String,
    required: true,
    minlength: 2,
  },

  description: {
    type: String,
    required: true,
    minlength: 2,
  },

  duration: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный url',
    },
  },

  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный url',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный url',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },

  movieId: {
    type: Number,
    required: true,
    unique: true,
  },

});

module.exports = mongoose.model('movies', moviesSchema);
