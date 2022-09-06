const { CREATED_STATUS } = require('./constants');

module.exports.handlesuccessfulСreation = (res, createdObject) => {
  res.status(CREATED_STATUS);
  res.send(createdObject);
};
