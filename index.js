const express = require('express');
const bodyParser = require('body-parser');
const logger = require('logger').createLogger();

const router = require('./router');

const app = express();

app.use(bodyParser.json());

app.use(router);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.all('*', (req, res) => {
  const { path, method } = req;
  res.status(400).send({'developerMessage': `The ${method} method - ${path} path doesn't exist!`});
});

app.use('/', (err, req, res) => {
  logger.error(err);
  res.status(500).send({'developerMessage': 'Internal Server Error'})
})

const port = process.env.PORT ||8001;
app.listen(port, () => {
  logger.info(`The project owner service is listening on port ${port}`);
})