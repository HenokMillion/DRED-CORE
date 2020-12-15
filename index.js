/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./logger');
const dotenv = require('dotenv').config()

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const authMiddleware = require('./middlewares/auth.middleware')
const routes = require('./routes/index.route');
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

const dbOptions = {
  connectTimeoutMS: 9000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000
};
const connectDb = () => {
  mongoose.connect(process.env.MONGODB_URL, dbOptions);
};
connectDb()
mongoose.connection.on('disconnected', () => {
  connectDb();
});
mongoose.connection.on('connected', () => {
  console.log('connected to database');
});
mongoose.connection.on('connecting', () => {
  console.log('connecting to database...');
});
mongoose.connection.on('reconnected', () => {
  console.log('reconnected to database');
});
const corswhitelist = ['http://localhost:8000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (corswhitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "*")
  next()
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// to be changed to public
app.use('/static', authMiddleware)
app.use('/api', routes);
app.use('/static', express.static('uploads'))
app.all('**', (req, res, next) => {
  res.status(404).json({ status: 404, success: false, error: 'Not found' });
});

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
