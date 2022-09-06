const { User } = require('../models/userModel');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const {
  UPDATING_USER_PROFILE_ERROR_TEXT,
  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
} = require('../utils/constants');

module.exports.getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).orFail(() => {
      throw new NotFoundError(MISSING_USER_ID_ERROR_TEXT);
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    ).orFail(() => {
      throw new NotFoundError(MISSING_USER_ID_ERROR_TEXT);
    });

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(UPDATING_USER_PROFILE_ERROR_TEXT));
      return;
    }

    if (err.name === 'CastError') {
      next(new BadRequestError(INCORRECT_USER_ID_ERROR_TEXT));
      return;
    }

    next(err);
  }
};
