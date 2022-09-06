const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');

const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');

const { jwtSign } = require('../utils/utils');

const {
  SALT_ROUNDS,
  DUPLICATE_RECORD_CODE,
  AUTHORIZATION_FAILED_TEXT,
  EXISTING_USER_ERROR_TEXT,
  CREATING_USER_ERROR_TEXT,
  UPDATING_USER_PROFILE_ERROR_TEXT,
  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
} = require('../utils/constants');

module.exports.createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const hash = bcrypt(password, SALT_ROUNDS);
    let user = await User.create({
      email,
      password: hash,
      name,
    });
    user = user.toObject();
    delete user.password;
  } catch (err) {
    if (err.code === DUPLICATE_RECORD_CODE) {
      next(new ConflictError(EXISTING_USER_ERROR_TEXT));
      return;
    }

    if (err.name === 'ValidationError') {
      next(new BadRequestError(CREATING_USER_ERROR_TEXT));
      return;
    }

    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .orFail(() => {
        next(new UnauthorizedError(AUTHORIZATION_FAILED_TEXT));
      })
      .select('+password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      next(new UnauthorizedError(AUTHORIZATION_FAILED_TEXT));
    }

    const token = jwtSign(user);
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

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