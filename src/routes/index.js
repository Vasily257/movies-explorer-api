const express = require('express');

const { createUser, login } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { movieRoutes } = require('./movieRoutes');
const { validateUserData } = require('../middlewares/validate-requests');

const routes = express.Router();

routes.post('/signup', validateUserData, createUser);
routes.post('/signin', validateUserData, login);
routes.use(auth);
routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);
