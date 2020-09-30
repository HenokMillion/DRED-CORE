/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const routes = require('./routes/index.route')
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
    const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
// setup(app, {
//   outputPath: resolve(process.cwd(), 'build'),
//   publicPath: '/',
// });

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';


// // use the gzipped bundle
// app.get('*.js', (req, res, next) => {
//   req.url = req.url + '.gz'; // eslint-disable-line
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

let dbOptions = { 
  connectTimeoutMS: 9000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connect = () => {
  mongoose.connect('mongodb://localhost:27017/DRED', dbOptions)
}
mongoose.connect('mongodb://localhost:27017/DRED', dbOptions)
mongoose.connection.on('disconnected', () => {
  connect();
})

mongoose.connection.on('connected', () => {
  console.log('connected to database')
})

mongoose.connection.on('connecting', () => {
  console.log('connecting to database...')
})

mongoose.connection.on('reconnected', () => {
  console.log('reconnected to database')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', routes)
app.all('**', (req, res, next) => {
  res.status(404).json({status: 404, success: false, error: "Not found"})
})

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
