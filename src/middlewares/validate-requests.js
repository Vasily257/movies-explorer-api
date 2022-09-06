const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');

const userNameRules = Joi.string().min(2).max(30);
const emailRules = Joi.string().required().email();
const passwordRules = Joi.string().required();
const linkRules = Joi.string().required().regex(linkRegex);
const requiredStringRules = Joi.string().required();
const requiredNumberRules = Joi.number().required();
const idRules = Joi.string().alphanum().length(24);

module.exports.validateUserData = celebrate({
  body: Joi.object().keys({
    name: userNameRules,
    email: emailRules,
    password: passwordRules,
  }),
});

module.exports.validateUpdatingUserInfo = celebrate({
  body: Joi.object().keys({
    name: userNameRules,
    email: emailRules,
  }),
});

module.exports.validateMovieData = celebrate({
  body: Joi.object().keys({
    country: requiredStringRules,
    director: requiredStringRules,
    duration: requiredNumberRules,
    year: requiredStringRules,
    description: requiredStringRules,
    image: linkRules,
    trailerLink: linkRules,
    thumbnail: linkRules,
    owner: idRules,
    movieId: idRules,
    nameRU: requiredStringRules,
    nameEN: requiredStringRules,
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: idRules,
  }),
});
