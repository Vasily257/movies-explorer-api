const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;
const INTERNAL_SERVER_ERROR_STATUS = 500;

const SALT_ROUNDS = 10;
const DUPLICATE_RECORD_CODE = 11000;

const AUTHORIZATION_WARNING_TEXT = 'Вам нужно авторизоваться.';
const AUTHORIZATION_FAILED_TEXT = 'Пользователь с такой почтой или паролем не найден.';

const CREATING_USER_ERROR_TEXT = 'Переданы некорректные данные при создании пользователя.';
const UPDATING_USER_PROFILE_ERROR_TEXT = 'Переданы некорректные данные при обновлении профиля пользователя.';
const MISSING_USER_ID_ERROR_TEXT = 'По указанному _id пользователь не найден.';
const EXISTING_USER_ERROR_TEXT = 'Такой пользователь уже существует.';
const USING_MAIL_ERROR_TEXT = 'Такая электронная почта уже используется.';

const CREATING_MOVIE_ERROR_TEXT = 'Переданы некорректные данные при создании фильма.';
const INCORRECT_MOVIE_ID_ERROR_TEXT = 'Неправильно указан _id фильма.';
const MISSING_MOVIE_ID_ERROR_TEXT = 'По указанному _id фильм не найден.';
const DELETING_MOVIE_ERROR_TEXT = 'Нельзя удалить фильм другого пользователя.';

const SERVER_ERROR_TEXT = 'Внутренняя ошибка сервера.';

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

const linkRegex = /https?:\/\/(www\.)?([a-z0-9\-.])+(\.\w*)(\/*([\w\-._~:?#[\]@!$&'()*+,;=]))*/i;

module.exports = {
  CREATED_STATUS,
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  CONFLICT_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,

  SALT_ROUNDS,
  DUPLICATE_RECORD_CODE,

  AUTHORIZATION_WARNING_TEXT,
  AUTHORIZATION_FAILED_TEXT,

  CREATING_USER_ERROR_TEXT,
  UPDATING_USER_PROFILE_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
  EXISTING_USER_ERROR_TEXT,
  USING_MAIL_ERROR_TEXT,

  CREATING_MOVIE_ERROR_TEXT,
  MISSING_MOVIE_ID_ERROR_TEXT,
  DELETING_MOVIE_ERROR_TEXT,
  INCORRECT_MOVIE_ID_ERROR_TEXT,

  SERVER_ERROR_TEXT,

  limiterOptions,
  corsOptions,

  linkRegex,
};
