const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2)
      .messages({
        'string.min': 'Поле должно быть больше 2 символов',
        'any.required': 'Поле country обязательно для заполнения',
      }),
    director: Joi.string().required().min(2)
      .messages({
        'string.min': 'Поле должно быть больше 2 символов',
        'any.required': 'Поле director обязательно для заполнения',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле duration обязательно для заполнения',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле year обязательно для заполнения',
      }),
    description: Joi.string().required().min(2)
      .messages({
        'any.required': 'Поле description обязательно для заполнения',
      }),
    image: Joi.string().required()
      .messages({
        'any.required': 'Поле image обязательно для заполнения',
      })
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    trailer: Joi.string().required()
      .messages({
        'any.required': 'Поле trailer обязательно для заполнения',
      })
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    thumbnail: Joi.string().required()
      .messages({
        'any.required': 'Поле thumbnail обязательно для заполнения',
      })
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле movieId обязательно для заполнения',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле nameRU обязательно для заполнения',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле nameEN обязательно для заполнения',
      }),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().required(),
    'any.required': 'Поле "movieId" обязательно для заполнения',
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'name должен быть больше 2 символов',
        'string.max': 'name должен быть менее 30 символов',
        'any.required': 'Поле name обязательно для заполнения',
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email обязательно для заполнения',
      }),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'name должен быть больше 2 символов',
        'string.max': 'name должен быть менее 30 символов',
        'any.required': 'Поле name обязательно для заполнения',
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email обязательно для заполнения',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'password должен быть больше 7 символов',
        'any.required': 'Поле password обязательно для заполнения',
      }),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'password должен быть больше 7 символов',
        'any.required': 'Поле password должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateUser, validateMovie, validateDeleteMovie, validateSignup, validateSignin,
};
