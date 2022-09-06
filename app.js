require('dotenv').config();

const process = require('process');
const express = require('express');
const mongoose = require('mongoose');

const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const { rateOptions, corsOptions } = require('./src/utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(rateLimit(rateOptions));
app.use(cors(corsOptions));
app.use(helmet());
app.use(requestLogger);

app.use(errorLogger);

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
}

startServer();

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
});
