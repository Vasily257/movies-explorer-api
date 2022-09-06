const express = require('express');

const { createUser, login } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { movieRoutes } = require('./movieRoutes');

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', login);
routes.use(auth);
routes.use('/users', userRoutes);
routes.use('/cards', movieRoutes);
