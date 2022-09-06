const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;
const INTERNAL_SERVER_ERROR_STATUS = 500;

const UPDATING_USER_PROFILE_ERROR_TEXT = 'Переданы некорректные данные при обновлении профиля пользователя.';
const INCORRECT_USER_ID_ERROR_TEXT = 'Неправильно указан _id пользователя.';
const MISSING_USER_ID_ERROR_TEXT = 'По указанному _id пользователь не найден.';

const CREATING_MOVIE_ERROR_TEXT = 'Переданы некорректные данные при создании фильма.';
const INCORRECT_MOVIE_ID_ERROR_TEXT = 'Неправильно указан _id фильма.';
const MISSING_MOVIE_ID_ERROR_TEXT = 'По указанному _id фильм не найден.';
const DELETING_CARD_ERROR_TEXT = 'Нельзя удалить фильм другого пользователя.';

const limiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = {
  CREATED_STATUS,
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  CONFLICT_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,

  UPDATING_USER_PROFILE_ERROR_TEXT,
  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,

  CREATING_MOVIE_ERROR_TEXT,
  MISSING_MOVIE_ID_ERROR_TEXT,
  DELETING_CARD_ERROR_TEXT,
  INCORRECT_MOVIE_ID_ERROR_TEXT,

  limiterOptions,
  corsOptions,
};
