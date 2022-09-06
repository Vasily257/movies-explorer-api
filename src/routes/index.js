const express = require('express');

const auth = require('../middlewares/auth');
const { userRoutes } = require('./userRoutes');
const { movieRoutes } = require('./movieRoutes');

const routes = express.Router();

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/cards', movieRoutes);
