const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes')

const app = express();

// applying middleware that is available as node modules
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set up our api routes
app.use('/api', routes);

// error handler
app.use((err, req, res, next) => {
   console.error(err);
   console.error(err.stack);
   res.status(err.status || 500).send(err.message || 'Internal server error.');
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;