const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { MONGO_URL, PORT } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());
app.use(limiter);

// app.use(cors(
//   {
//     origin: 'https://localhost:3001',
//     credentials: true,
//   },
// ));

app.use(cors());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
