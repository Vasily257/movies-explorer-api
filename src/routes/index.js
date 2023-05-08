const express = require('express');

const { createUser, login } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { movieRoutes } = require('./movieRoutes');
const { validateCreatingUser, validateLogining } = require('../middlewares/validate-requests');
const { BASE_ALIAS } = require('../utils/constants');

const NotFoundError = require('../errors/not-found-error');

const routes = express.Router();

routes.post(`${BASE_ALIAS}/signup`, validateCreatingUser, createUser);
routes.post(`${BASE_ALIAS}/signin`, validateLogining, login);
routes.use(auth);
routes.use(`${BASE_ALIAS}/users`, userRoutes);
routes.use(`${BASE_ALIAS}/movies`, movieRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена.'));
});

module.exports = { routes };
