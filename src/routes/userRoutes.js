const express = require('express');
const { getCurrentUser, updateUserProfile } = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', updateUserProfile);

module.exports = { userRoutes };
