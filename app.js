require('dotenv').config();

const process = require('process');
const express = require('express');
const mongoose = require('mongoose');

const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');

const { rateOptions, corsOptions } = require('./src/utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(rateLimit(rateOptions));
app.use(cors(corsOptions));
app.use(helmet());

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT);
}

startServer();
