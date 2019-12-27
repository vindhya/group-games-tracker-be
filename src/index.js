const express = require('express');
const morgan = require('morgan');

const router = require('./api');
const { logger } = require('./utils/logger');

const app = express();
const port = process.env.PORT || 8081;

logger.info('🤖 Initializing middleware');

app.use(morgan('tiny', { stream: logger.stream }));
app.use('/', router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}

module.exports = { app };
