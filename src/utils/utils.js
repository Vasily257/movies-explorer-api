const jwt = require('jsonwebtoken');
const { STATUS } = require('./constants');

const { JWT_SECRET, NODE_ENV } = process.env;
const { JWT_SECRET_DEV } = require('./config');

module.exports.handlesuccessfulСreation = (res, createdObject) => {
  res.status(STATUS.CREATED);
  res.send(createdObject);
};

module.exports.jwtSign = (user) => jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, {
  expiresIn: '7d',
});

module.exports.jwtVerify = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
